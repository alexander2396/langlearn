using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Langlearn.Application.Japanese.Syllables.Queries.GetSyllablesList;
using Langlearn.Application.Japanese.Syllables.Commands.ToggleIsActive;

namespace Langlearn.WebUI.Controllers.Japanese
{
    [Area("Japanese")]
    public class SyllablesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<SyllableLookupModel>>> GetList([FromQuery]GetSyllablesListQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<IActionResult> ToggleIsActive(int id)
        {
            await Mediator.Send(new ToggleIsActiveCommand { Id = id });

            return NoContent();
        }
    }
}
