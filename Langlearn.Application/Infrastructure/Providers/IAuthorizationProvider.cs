using System.Threading.Tasks;
using Langlearn.Domain.Entities.Account;

namespace Langlearn.Application.Infrastructure.Providers
{
    public interface IAuthorizationProvider
    {
        Task<User> GetCurrentUser();
    }
}
