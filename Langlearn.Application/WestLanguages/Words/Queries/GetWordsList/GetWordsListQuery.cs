using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Linq;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Infrastructure.Providers;

namespace Langlearn.Application.WestLanguages.Words.Queries.GetWordsList
{
    public class GetWordsListQuery : IRequest<WordsListViewModel>
	{
		public int LanguageId { get; set; }
		public int Skip { get; set; }
		public int Take { get; set; }
		public bool ForPractice { get; set; }
        public int? WordCategoryId { get; set; }
        public bool ActiveOnly { get; set; }

        public class GetWordsListQueryHandler : IRequestHandler<GetWordsListQuery, WordsListViewModel>
		{
			private readonly ILanguagerContext _context;
			private readonly IMapper _mapper;
            private readonly IAuthorizationProvider _authorizationProvider;

            public GetWordsListQueryHandler(ILanguagerContext context, IMapper mapper, IAuthorizationProvider authorizationProvider)
			{
				_context = context;
				_mapper = mapper;
                _authorizationProvider = authorizationProvider;
            }

			public async Task<WordsListViewModel> Handle(GetWordsListQuery request, CancellationToken cancellationToken)
			{
                var user = await _authorizationProvider.GetCurrentUser();
                var query = _context.Words.Where(w => w.LanguageId == request.LanguageId && w.UserId == user.Id);
                int count = await query.CountAsync();

                ApplyWhereClauses(ref query, request);

                ApplySortOrder(ref query, request);

                ApplyPagination(ref query, request);

                return new WordsListViewModel()
                {
                    Words = await query
                        .AsNoTracking()
                        .ProjectTo<WordLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken),
                    ItemCount = count
                };
            }

            private static void ApplyWhereClauses(ref IQueryable<Word> query, GetWordsListQuery request)
            {
                if (request.ActiveOnly)
                {
                    query = query.Where(s => s.IsActive);
                }

                if (request.WordCategoryId != null)
                {
                    query = query.Where(q => q.WordCategoryId == request.WordCategoryId);
                }
            }

            private static void ApplySortOrder(ref IQueryable<Word> query, GetWordsListQuery request)
            {
                if (request.ForPractice)
                {
                    query = query.OrderBy(r => r.CorrectCount - r.WrongCount);
                }
                else
                {
                    query = query.OrderByDescending(s => s.IsActive);
                }
            }

            private static void ApplyPagination(ref IQueryable<Word> query, GetWordsListQuery request)
            {
                if (request.Skip > 0)
                {
                    query = query.Skip(request.Skip);
                }

                if (request.Take > 0)
                {
                    query = query.Take(request.Take);
                }
            }
        }
    }
}
