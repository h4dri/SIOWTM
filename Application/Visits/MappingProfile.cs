using AutoMapper;
using Domain;

namespace Application.Visits
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Visit, VisitDto>();
            CreateMap<UserVisit, AttendeeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.IsDoctor, o => o.MapFrom(s => s.AppUser.IsDoctor));
        }
    }
}