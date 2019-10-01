using System;
using System.Collections.Generic;
using System.Linq;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Domain.Static.Japanese;
using Langlearn.Domain.Entities.Japanese;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.DataAccess
{
	public class DatabaseInitializer
	{
		public static void Initialize(LanguagerContext context)
		{
			var initializer = new DatabaseInitializer();

            try
            {
                initializer.SeedEverything(context);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }		
		}

		public void SeedEverything(LanguagerContext context)
		{
			context.Database.EnsureCreated();

			if (!context.Languages.Any())
			{
                SeedLanguages(context);
            }

            SeedSyllables(context);

            if (!context.Users.Any())
            {
                SeedUsers(context);
            } 
        }

		public void SeedLanguages(LanguagerContext context)
		{
			var languages = new[]
			{
				new Language("english")
			};

			context.Languages.AddRange(languages);
			context.SaveChanges();
		}

        public void SeedSyllables(LanguagerContext context)
        {
            var syllables = new List<Syllable>();
            syllables.AddRange(Syllabary.Hiragana);
            syllables.AddRange(Syllabary.Katakana);

            foreach (var syllable in syllables)
            {
                if (!context.Syllables.Any(s => s.Value == syllable.Value))
                {
                    context.Syllables.Add(syllable);
                }
            }

            context.SaveChanges();
        }

        public void SeedUsers(LanguagerContext context)
        {
            var user = new User("Oleksandr Kalashnykov", "okalashnykov");

            context.Users.Add(user);

            context.SaveChanges();
        }
	}
}
