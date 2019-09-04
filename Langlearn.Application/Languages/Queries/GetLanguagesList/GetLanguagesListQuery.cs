using MediatR;

namespace Langlearn.Application.Languages.Queries.GetLanguagesList
{
	public class GetLanguagesListQuery : IRequest<LanguagesListViewModel>
	{
	}
}
