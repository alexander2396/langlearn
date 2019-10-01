using AutoMapper;
using Langlearn.Application.Interfaces.Mapping;
using Langlearn.Domain.Entities.Japanese;
using Langlearn.Domain.Enums;

namespace Langlearn.Application.Japanese.Syllables.Queries.GetSyllablesList
{
    public class SyllableLookupModel : IHaveCustomMapping
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public string Transliteration { get; set; }
        public SyllabaryType SyllabaryType { get; set; }
        public bool IsActive { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<Syllable, SyllableLookupModel>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(l => l.Id))
                .ForMember(dto => dto.Value, opt => opt.MapFrom(l => l.Value))
                .ForMember(dto => dto.Transliteration, opt => opt.MapFrom(l => l.Transliteration))
                .ForMember(dto => dto.SyllabaryType, opt => opt.MapFrom(l => l.SyllabaryType));
        }
    }
}
