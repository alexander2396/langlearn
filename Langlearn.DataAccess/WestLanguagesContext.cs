using Microsoft.EntityFrameworkCore;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.DataAccess
{
	public class WestLanguagesContext : DbContext, IWestLanguagesContext
	{
		public WestLanguagesContext(DbContextOptions<WestLanguagesContext> options)
			: base(options)
		{
		}

		public DbSet<Language> Languages { get; set; }
		public DbSet<Word> Words { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(WestLanguagesContext).Assembly);
		}
	}
}
