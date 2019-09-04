using AutoMapper;
using Langlearn.Application.Interfaces.Mapping;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.Languages.Queries.GetLanguagesList
{
	public class LanguageLookupModel : IHaveCustomMapping
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public void CreateMappings(Profile configuration)
		{
			configuration.CreateMap<Language, LanguageLookupModel>()
				.ForMember(lDTO => lDTO.Id, opt => opt.MapFrom(l => l.Id))
				.ForMember(lDTO => lDTO.Name, opt => opt.MapFrom(l => l.Name));
		}
	}
}
