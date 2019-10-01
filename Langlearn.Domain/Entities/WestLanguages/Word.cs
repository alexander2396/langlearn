using System;
using System.Collections.Generic;
using System.Text;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.Domain.Entities.WestLanguages
{
	public class Word
	{
		public int Id { get; private set; }
		public int LanguageId { get; private set; }
        public int? WordCategoryId { get; private set; }
        public string Text { get; private set; }
		public string Translation { get; private set; }
        public bool IsActive { get; private set; }
        public int UserId { get; private set; }
        public int CorrectCount { get; private set; }
        public int WrongCount { get; private set; }

        public Language Language { get; set; }
        public WordCategory WordCategory { get; set; }
        public User User { get; set; }

        public Word(int languageId, string text, string translation, int userId, int? wordCategoryId = null, bool isActive = true)
		{
			LanguageId = languageId;
			Text = text;
			Translation = translation;
            UserId = userId;
            WordCategoryId = wordCategoryId;
            IsActive = isActive;
            CorrectCount = 0;
            WrongCount = 0;
        }

        public void Update(string text, string translation, int? wordCategoryId = null, bool isActive = true)
        {
            Text = text;
            Translation = translation;
            WordCategoryId = wordCategoryId;
            IsActive = isActive;
        }

        public void ToggleIsActive()
        {
            IsActive = !IsActive;
        }

        public void UpdateCount(bool isCorrect)
        {
            if (isCorrect)
            {
                CorrectCount++;
            }
            else
            {
                WrongCount++;
            }
        }
    }
}
