using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Application.Visits
{
    public class List
    {
        public class Query : IRequest<List<VisitDto>> { }

        public class Handler : IRequestHandler<Query, List<VisitDto>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<VisitDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var visits = await _context.Visits
                .Include(x => x.UserVisits)
                .ThenInclude(x => x.AppUser)
                .ToListAsync();
                return _mapper.Map<List<Visit>, List<VisitDto>>(visits);
            }
        }
    }
}