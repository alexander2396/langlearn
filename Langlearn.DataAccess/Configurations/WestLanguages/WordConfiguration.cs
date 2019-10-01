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

            builder.Property(e => e.CorrectCount)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(e => e.WrongCount)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(e => e.Translation)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasOne(e => e.Language)
				.WithMany(l => l.Words)
				.HasForeignKey(e => e.LanguageId)
				.OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.WordCategory)
                .WithMany(wc => wc.Words)
                .HasForeignKey(e => e.WordCategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(e => e.User)
                .WithMany(u => u.Words)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
	}
}
