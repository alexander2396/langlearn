using System.Collections.Generic;

namespace Langlearn.Domain.Entities.WestLanguages
{
	public class Language
	{
		public int Id { get; set; }
		public string Name { get; private set; }

		public ICollection<Word> Words { get; private set; }
        public ICollection<WordCategory> WordCategories { get; private set; }

        public Language(string name)
		{
			Name = name;
			Words = new HashSet<Word>();
            WordCategories = new HashSet<WordCategory>();

        }
	}
}
