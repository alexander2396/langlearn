using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.DataAccess.Configurations.WestLanguages
{
	public class WordConfiguration : IEntityTypeConfiguration<Word>
	{
		public void Configure(EntityTypeBuilder<Word> builder)
		{
			builder.Property(e => e.Text)
				.IsRequired()
				.HasMaxLength(50);

			builder.Property(e => e.Translation)
				.IsRequired()
				.HasMaxLength(50);

			builder.HasOne(e => e.Language)
				.WithMany(l => l.Words)
				.HasForeignKey(e => e.LanguageId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
