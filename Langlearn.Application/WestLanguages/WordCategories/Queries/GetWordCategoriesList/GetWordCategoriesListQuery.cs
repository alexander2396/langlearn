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

namespace Langlearn.Application.WestLanguages.WordCategories.Queries.GetWordCategoriesList
{
    public class GetWordCategoriesListQuery : IRequest<WordCategoriesListViewModel>
    {
        public int LanguageId { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }

        public class GetWordsListQueryHandler : IRequestHandler<GetWordCategoriesListQuery, WordCategoriesListViewModel>
        {
            private readonly ILanguagerContext _context;
            private readonly IMapper _mapper;

            public GetWordsListQueryHandler(ILanguagerContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<WordCategoriesListViewModel> Handle(GetWordCategoriesListQuery request, CancellationToken cancellationToken)
            {
                var query = _context.WordCategories.Where(w => w.LanguageId == request.LanguageId);
                int count = await query.CountAsync();

                if (request.Skip > 0)
                {
                    query = query.Skip(request.Skip);
                }

                if (request.Take > 0)
                {
                    query = query.Take(request.Take);
                }

                return new WordCategoriesListViewModel()
                {
                    WordCategories = await query
                        .AsNoTracking()
                        .ProjectTo<WordCategoryLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken),
                    ItemCount = count
                };
            }
        }
    }
}
