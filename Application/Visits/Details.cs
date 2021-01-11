
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Visits
{
    public class Details
    {
        public class Query : IRequest<VisitDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, VisitDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<VisitDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var visit = await _context.Visits
                .FindAsync(request.Id);

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound,
                    new { visit = "Not Found" });

                var visitToReturn = _mapper.Map<Visit, VisitDto>(visit);

                return visitToReturn;
            }
        }
    }
}