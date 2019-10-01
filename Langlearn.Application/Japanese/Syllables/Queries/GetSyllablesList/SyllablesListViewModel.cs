using System.Collections.Generic;
using Langlearn.Domain.Entities.Japanese;

namespace Langlearn.Application.Japanese.Syllables.Queries.GetSyllablesList
{
    public class SyllablesListViewModel
    {
        public IList<SyllableLookupModel> Syllables { get; set; }
    }
}
