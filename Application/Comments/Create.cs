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
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentsDto>
        {
            public string Body { get; set; }
            public Guid VisitId { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentsDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CommentsDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var visit = await _context.Visits.FindAsync(request.VisitId);

                if (visit == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not found"});

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                var comment = new Comment
                {
                    Author = user,
                    Visit = visit,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                visit.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentsDto>(comment);

                throw new Exception("Problem saving changes");
            }
        }
    }
}