using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.DataAccess.Configurations.WestLanguages
{
    public class WordCategoryConfiguration : IEntityTypeConfiguration<WordCategory>
    {
        public void Configure(EntityTypeBuilder<WordCategory> builder)
        {
            builder.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(e => e.Language)
                .WithMany(l => l.WordCategories)
                .HasForeignKey(e => e.LanguageId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
