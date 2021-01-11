using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public bool IsDoctor { get; set; }
        public virtual ICollection<UserVisit> UserVisits { get; set; }
    }
}