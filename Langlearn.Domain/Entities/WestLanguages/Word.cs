using System;
using System.Collections.Generic;
using System.Text;

namespace Langlearn.Domain.Entities.WestLanguages
{
	public class Word
	{
		public int Id { get; set; }
		public int LanguageId { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }

		public Language Language { get; set; }

		public Word(int languageId, string text, string translation)
		{
			LanguageId = languageId;
			Text = text;
			Translation = translation;
		}
	}
}
