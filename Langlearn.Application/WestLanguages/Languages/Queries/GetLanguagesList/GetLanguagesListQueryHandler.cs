using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Langlearn.Application.Interfaces;

namespace Langlearn.Application.WestLanguages.Languages.Queries.GetLanguagesList
{
	public class GetLanguagesListQueryHandler : IRequestHandler<GetLanguagesListQuery, List<LanguageLookupModel>>
	{
		private readonly IWestLanguagesContext _context;
		private readonly IMapper _mapper;

		public GetLanguagesListQueryHandler(IWestLanguagesContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<List<LanguageLookupModel>> Handle(GetLanguagesListQuery request, CancellationToken cancellationToken)
		{
			return await _context.Languages.ProjectTo<LanguageLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
		}
	}
}
