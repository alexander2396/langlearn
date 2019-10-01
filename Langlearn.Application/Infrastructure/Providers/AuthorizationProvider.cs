using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Langlearn.Domain.Entities.Account;
using Langlearn.Application.Interfaces;

namespace Langlearn.Application.Infrastructure.Providers
{
    public class AuthorizationProvider : IAuthorizationProvider
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILanguagerContext _languagerContext;

        public AuthorizationProvider(ILanguagerContext languagerContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _languagerContext = languagerContext;
        }

        public Task<User> GetCurrentUser()
        {
            var userName = _httpContextAccessor.HttpContext.User.Identity.Name;
            var login = userName.Split('\\').Last();

            return _languagerContext.Users.FirstOrDefaultAsync(u => u.Login == login);
        }
    }
}
