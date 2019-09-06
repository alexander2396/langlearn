using MediatR;
using System.Collections.Generic;

namespace Langlearn.Application.WestLanguages.Languages.Queries.GetLanguagesList
{
	public class GetLanguagesListQuery : IRequest<List<LanguageLookupModel>>
	{
	}
}
