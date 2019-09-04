using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Langlearn.Application.Interfaces;

namespace Langlearn.Application.Languages.Queries.GetLanguagesList
{
	public class GetLanguagesListQueryHandler : IRequestHandler<GetLanguagesListQuery, LanguagesListViewModel>
	{
		private readonly IWestLanguagesContext _context;
		private readonly IMapper _mapper;

		public GetLanguagesListQueryHandler(IWestLanguagesContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<LanguagesListViewModel> Handle(GetLanguagesListQuery request, CancellationToken cancellationToken)
		{
			return new LanguagesListViewModel
			{
				Languages = await _context.Languages.ProjectTo<LanguageLookupModel>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken)
			};
		}
	}
}
