using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Visits
{
    public class Edit
    {
         public class Command : IRequest
                {
                    public Guid Id {get; set;}
                    public string Title {get;set;}
                    public string Description {get;set;}
                    public string Category {get;set;}
                    public DateTime? Date {get;set;}
                    public int? DoctorId {get;set;}
                    public int? PatientId  {get;set;}
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
                        
                        visit.Title = request.Title ?? visit.Title;
                        visit.Description = request.Description ?? visit.Description;
                        visit.Category = request.Category ?? visit.Category;
                        visit.Date = request.Date ?? visit.Date;
                        visit.DoctorId = request.DoctorId ?? visit.DoctorId;
                        visit.PatientId = request.PatientId ?? visit.PatientId;

                        var success = await _context.SaveChangesAsync() > 0;
        
                        if(success) return Unit.Value;
        
                        throw new Exception("Problem saving changes");
                    }
                }
    }
}