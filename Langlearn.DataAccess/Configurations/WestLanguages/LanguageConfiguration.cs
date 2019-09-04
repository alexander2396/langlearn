using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.DataAccess.Configurations
{
	public class LanguageConfiguration : IEntityTypeConfiguration<Language>
	{
		public void Configure(EntityTypeBuilder<Language> builder)
		{
			builder.Property(e => e.Name)
				.IsRequired()
				.HasMaxLength(50);
		}
	}
}
