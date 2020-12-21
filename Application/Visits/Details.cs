
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Visits
{
    public class Details
    {
        public class Query : IRequest<Visit>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Visit>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Visit> Handle(Query request, CancellationToken cancellationToken)
            {
                var visit = await _context.Visits.FindAsync(request.Id);

                return visit;
            }
        }
    }
}