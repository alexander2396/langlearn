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
using Langlearn.Domain.Enums;

namespace Langlearn.Application.Japanese.Syllables.Queries.GetSyllablesList
{
    public class GetSyllablesListQuery : IRequest<List<SyllableLookupModel>>
    {
        public SyllabaryType SyllabaryType { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public bool RandomOrder { get; set; }
        public bool ActiveOnly { get; set; }

        public class GetWordsListQueryHandler : IRequestHandler<GetSyllablesListQuery, List<SyllableLookupModel>>
        {
            private readonly ILanguagerContext _context;
            private readonly IMapper _mapper;

            public GetWordsListQueryHandler(ILanguagerContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }
            public Task<List<SyllableLookupModel>> Handle(GetSyllablesListQuery request, CancellationToken cancellationToken)
            {
                var query = _context.Syllables.Where(w => w.SyllabaryType == request.SyllabaryType);

                if (request.ActiveOnly)
                {
                    query = query.Where(s => s.IsActive);
                }

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

                if (!request.RandomOrder)
                {
                    query = query.OrderByDescending(s => s.IsActive).ThenBy(s => s.Transliteration.Length).ThenBy(s => s.Transliteration);
                }       

                return query
                    .AsNoTracking()
                    .ProjectTo<SyllableLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            }
        }
    }
}
