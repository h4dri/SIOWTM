using System;
using System.Collections.Generic;

namespace Domain
{
    public class Visit
    {
        public Guid Id {get; set;}

        public string Title {get;set;}
        public string Description {get;set;}
        public string Category {get;set;}
        public DateTime Date {get;set;}
        public int DoctorId {get;set;}
        public int PatientId  {get;set;}
        public virtual ICollection<UserVisit> UserVisits {get; set;}

    }
}