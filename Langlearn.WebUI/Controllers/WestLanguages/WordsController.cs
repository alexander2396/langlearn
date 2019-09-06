using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Langlearn.Application.WestLanguages.Words.Queries.GetWordsList;
using Langlearn.Application.WestLanguages.Words.Commands.CreateWord;
using Langlearn.Application.WestLanguages.Words.Commands.UpdateWord;
using Langlearn.Application.WestLanguages.Words.Commands.DeleteWord;

namespace Langlearn.WebUI.Controllers.WestLanguages
{
	[Area("WestLanguages")]
	public class WordsController : BaseController
	{
		[HttpGet]
		public async Task<ActionResult<List<WordLookupModel>>> GetAll([FromQuery]GetWordsListQuery query)
		{
			return Ok(await Mediator.Send(query));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody]CreateWordCommand command)
		{
			await Mediator.Send(command);
			return NoContent();
		}

		[HttpPut]
		public async Task<IActionResult> Update([FromBody]UpdateWordCommand command)
		{
			await Mediator.Send(command);
			return NoContent();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete(int id)
		{
			await Mediator.Send(new DeleteWordCommand { Id = id });

			return NoContent();
		}
	}
}
