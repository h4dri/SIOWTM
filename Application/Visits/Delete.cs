using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Visits
{
    public class Delete
    {
         public class Command : IRequest
                {
                    public Guid Id { get; set; } 
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var visit = await _context.Visits.FindAsync(request.Id);

                        if(visit == null)
                            throw new Exception("Could not find visit");

                        _context.Remove(visit);
                        
                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}