using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.DataAccess.Configurations.Account
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(e => e.Login)
               .IsRequired()
               .HasMaxLength(50);
        }
    }
}
