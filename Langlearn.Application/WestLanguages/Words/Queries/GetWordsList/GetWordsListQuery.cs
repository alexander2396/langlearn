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

namespace Langlearn.Application.WestLanguages.Words.Queries.GetWordsList
{
	public class GetWordsListQuery : IRequest<List<WordLookupModel>>
	{
		public int LanguageId { get; set; }
		public int Skip { get; set; }
		public int Take { get; set; }
		public bool RandomOrder { get; set; }

		public class GetWordsListQueryHandler : IRequestHandler<GetWordsListQuery, List<WordLookupModel>>
		{
			private readonly IWestLanguagesContext _context;
			private readonly IMapper _mapper;

			public GetWordsListQueryHandler(IWestLanguagesContext context, IMapper mapper)
			{
				_context = context;
				_mapper = mapper;
			}

			public async Task<List<WordLookupModel>> Handle(GetWordsListQuery request, CancellationToken cancellationToken)
			{
				var query = _context.Words.Where(w => w.LanguageId == request.LanguageId);

				if (request.RandomOrder)
				{
					query = query.OrderBy(r => Guid.NewGuid());
				}

				if (request.Skip > 0)
				{
					query = query.Skip(request.Skip);
				}

				if (request.Take > 0)
				{
					query = query.Take(request.Take);
				}

				return await query
					.AsNoTracking()
					.ProjectTo<WordLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
			}
		}
	}
}
