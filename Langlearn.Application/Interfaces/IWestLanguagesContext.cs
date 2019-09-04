using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.Interfaces
{
	public interface IWestLanguagesContext
	{
		DbSet<Language> Languages { get; set; }
		DbSet<Word> Words { get; set; }

		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	}
}
