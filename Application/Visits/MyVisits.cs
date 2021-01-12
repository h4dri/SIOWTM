using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Visits
{
    public class MyVisits
    {
        public class Query : IRequest<List<VisitDto>> { }

        public class Handler : IRequestHandler<Query, List<VisitDto>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<VisitDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername
                ());
                
                var query = from v in _context.Visits where v.UserVisits.Any(u => u.AppUserId == user.Id) select v;
                var result = await query.ToListAsync();


                return _mapper.Map<List<Visit>, List<VisitDto>>(result);
            }
        }
    }
}
