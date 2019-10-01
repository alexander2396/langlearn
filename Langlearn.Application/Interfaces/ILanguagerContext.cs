using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Domain.Entities.Japanese;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.Application.Interfaces
{
	public interface ILanguagerContext
	{
		DbSet<Language> Languages { get; set; }
		DbSet<Word> Words { get; set; }
        DbSet<WordCategory> WordCategories { get; set; }
        DbSet<User> Users { get; set; }

        DbSet<Syllable> Syllables { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	}
}
