using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistance;
using Microsoft.EntityFrameworkCore;

namespace Application.Visits
{
    public class List
    {
        public class Query : IRequest<List<Visit>> {}

        public class Handler : IRequestHandler<Query, List<Visit>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Visit>> Handle(Query request, CancellationToken cancellationToken)
            {
                var visits = await _context.Visits.ToListAsync();
                return visits;
            }
        }
    }
}