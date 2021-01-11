using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Domain;

namespace Application.Visits
{
    public class VisitDto
    {
        public Guid Id {get; set;}

        public string Title {get;set;}
        public string Description {get;set;}
        public string Category {get;set;}
        public DateTime Date {get;set;} 
        public string DocName {get;set;} 
        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> UserVisits {get; set;}
    }
}