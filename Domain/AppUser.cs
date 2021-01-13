using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public bool IsDoctor { get; set; }
        public bool Subscribe { get; set; }
        public DateTime StartDate {get;set;}
        public DateTime EndDate {get;set;}

        public virtual ICollection<UserVisit> UserVisits { get; set; }
    }
}