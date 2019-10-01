using System;
using System.Collections.Generic;
using System.Text;

namespace Langlearn.Application.WestLanguages.WordCategories.Queries.GetWordCategoriesList
{
    public class WordCategoriesListViewModel 
    {
        public IList<WordCategoryLookupModel> WordCategories { get; set; }
        public int ItemCount { get; set; }
    }
}
