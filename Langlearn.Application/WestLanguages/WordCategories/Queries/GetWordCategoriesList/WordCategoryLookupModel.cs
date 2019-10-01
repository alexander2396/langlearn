using AutoMapper;
using Langlearn.Application.Interfaces.Mapping;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.WestLanguages.WordCategories.Queries.GetWordCategoriesList
{
    public class WordCategoryLookupModel : IHaveCustomMapping
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LanguageId { get; set; }

        public void CreateMappings(Profile configuration)
        {
            configuration.CreateMap<WordCategory, WordCategoryLookupModel>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(l => l.Id))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(l => l.Name))
                .ForMember(dto => dto.LanguageId, opt => opt.MapFrom(l => l.LanguageId));
        }
    }
}
