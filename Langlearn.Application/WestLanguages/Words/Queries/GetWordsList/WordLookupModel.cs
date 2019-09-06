using AutoMapper;
using Langlearn.Application.Interfaces.Mapping;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.WestLanguages.Words.Queries.GetWordsList
{
	public class WordLookupModel : IHaveCustomMapping
	{
		public int Id { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }
		public int LanguageId { get; set; }

		public void CreateMappings(Profile configuration)
		{
			configuration.CreateMap<Word, WordLookupModel>()
				.ForMember(dto => dto.Id, opt => opt.MapFrom(l => l.Id))
				.ForMember(dto => dto.Text, opt => opt.MapFrom(l => l.Text))
				.ForMember(dto => dto.Translation, opt => opt.MapFrom(l => l.Translation))
				.ForMember(dto => dto.LanguageId, opt => opt.MapFrom(l => l.LanguageId));
		}
	}
}
