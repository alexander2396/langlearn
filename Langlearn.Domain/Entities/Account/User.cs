using System;
using System.Collections.Generic;
using System.Text;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Domain.Entities.Account
{
    public class User
    {
        public int Id { get; private set; }
        public string Login { get; private set; }
        public string Name { get; private set; }

        public ICollection<Word> Words { get; set; }

        public User(string name, string login)
        {
            Name = name;
            Login = login;
        }
    }
}
