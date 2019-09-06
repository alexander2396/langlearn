using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Langlearn.Application.WestLanguages.Languages.Queries.GetLanguagesList;

namespace Langlearn.WebUI.Controllers.WestLanguages
{
	[Area("WestLanguages")]
	public class LanguagesController : BaseController
	{
		[HttpGet]
		public async Task<ActionResult<List<LanguageLookupModel>>> GetAll([FromQuery] GetLanguagesListQuery query)
		{
			return Ok(await Mediator.Send(query));
		}
	}
}
