using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Langlearn.Domain.Entities.Japanese;

namespace Langlearn.DataAccess.Configurations.Japanese
{
    public class SyllableConfiguration : IEntityTypeConfiguration<Syllable>
    {
        public void Configure(EntityTypeBuilder<Syllable> builder)
        {
            builder.Property(e => e.Value)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(e => e.Transliteration)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
