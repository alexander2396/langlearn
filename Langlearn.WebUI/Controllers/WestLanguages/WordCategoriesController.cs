using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Langlearn.Application.WestLanguages.WordCategories.Commands.CreateWordCategory;
using Langlearn.Application.WestLanguages.WordCategories.Commands.UpdateWordCategory;
using Langlearn.Application.WestLanguages.WordCategories.Commands.DeleteWordCategory;
using Langlearn.Application.WestLanguages.WordCategories.Queries.GetWordCategoriesList;

namespace Langlearn.WebUI.Controllers.WestLanguages
{
    [Authorize]
    [Area("WestLanguages")]
    public class WordCategoriesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<WordCategoriesListViewModel>> GetList([FromQuery]GetWordCategoriesListQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateWordCategoryCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody]UpdateWordCategoryCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteWordCategoryCommand { Id = id });

            return NoContent();
        }
    }
}
