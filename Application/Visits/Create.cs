using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Visits
{
    public class Create
    {
        public class Command : IRequest
        {

            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; } 
            public string DocName { get; set; } 
        }
 
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty(); 
                RuleFor(x => x.DocName).NotEmpty(); 
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var visit = new Visit
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    DocName = request.DocName
                };

                _context.Visits.Add(visit);

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var doctor = await _context.Users.SingleOrDefaultAsync(d => d.UserName == request.DocName);

                var attendee = new UserVisit
                {
                    AppUser = user,
                    Visit = visit,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };
                var attendee2 = new UserVisit
                {
                    AppUser = doctor,
                    Visit = visit,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserVisits.Add(attendee);
                _context.UserVisits.Add(attendee2);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }

}