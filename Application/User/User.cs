using System;

namespace Application.User
{
    public class User
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public bool IsDoctor { get; set; }
        public bool Subscribe { get; set; }
        public DateTime StartDate {get;set;}
        public DateTime EndDate {get;set;}

    }
}