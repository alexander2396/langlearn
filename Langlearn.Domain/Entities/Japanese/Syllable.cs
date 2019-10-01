using System;
using System.Collections.Generic;
using System.Text;
using Langlearn.Domain.Enums;

namespace Langlearn.Domain.Entities.Japanese
{
    public class Syllable
    {
        public int Id { get; private set; }
        public string Value { get; private set; }
        public string Transliteration { get; private set; }
        public SyllabaryType SyllabaryType { get; private set; }
        public bool IsActive { get; private set; }

        public Syllable(string value, string transliteration, SyllabaryType syllabaryType)
        {
            Value = value;
            Transliteration = transliteration;
            SyllabaryType = syllabaryType;
            IsActive = true;
        }

        public void ToggleIsActive()
        {
            IsActive = !IsActive;
        }
    }
}
