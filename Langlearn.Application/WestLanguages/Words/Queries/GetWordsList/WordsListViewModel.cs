using System.Collections.Generic;

namespace Langlearn.Application.WestLanguages.Words.Queries.GetWordsList
{
	public class WordsListViewModel
	{
		public IList<WordLookupModel> Words { get; set; }
        public int ItemCount { get; set; }
    }
}
