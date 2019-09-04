using System;
using System.Collections.Generic;
using System.Linq;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.DataAccess
{
	public class WestLanguagesInitializer
	{
		private readonly Dictionary<int, Language> Languages = new Dictionary<int, Language>();

		public static void Initialize(WestLanguagesContext context)
		{
			var initializer = new WestLanguagesInitializer();
			initializer.SeedEverything(context);
		}

		public void SeedEverything(WestLanguagesContext context)
		{
			context.Database.EnsureCreated();

			if (context.Languages.Any())
			{
				return;
			}

			SeedLanguages(context);
		}

		public void SeedLanguages(WestLanguagesContext context)
		{
			var languages = new[]
			{
				new Language("english")
			};

			context.Languages.AddRange(languages);
			context.SaveChanges();
		}
	}
}
