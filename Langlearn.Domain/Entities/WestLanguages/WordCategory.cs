using System;
using System.Collections.Generic;
using System.Text;

namespace Langlearn.Domain.Entities.WestLanguages
{
    public class WordCategory
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public int LanguageId { get; private set; }

        public Language Language { get; set; }
        public ICollection<Word> Words { get; set; }

        public WordCategory(int languageId, string name)
        {
            LanguageId = languageId;
            Name = name;
            Words = new HashSet<Word>();
        }

        public void Update(string name)
        {
            Name = name;
            Words = new HashSet<Word>();
        }
    }
}
