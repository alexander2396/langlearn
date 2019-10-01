using Microsoft.EntityFrameworkCore;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Domain.Entities.Japanese;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.DataAccess
{
	public class LanguagerContext : DbContext, ILanguagerContext
    {
		public LanguagerContext(DbContextOptions<LanguagerContext> options)
			: base(options)
		{
		}

        public DbSet<User> Users { get; set; }

        public DbSet<Language> Languages { get; set; }
		public DbSet<Word> Words { get; set; }
        public DbSet<WordCategory> WordCategories { get; set; }

        public DbSet<Syllable> Syllables { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(LanguagerContext).Assembly);
		}
	}
}
