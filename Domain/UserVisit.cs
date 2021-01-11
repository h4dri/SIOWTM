using System;

namespace Domain
{
    public class UserVisit
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid VisitId { get; set; }
        public Visit Visit { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}