using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.User
{
    public class Doctors
    {
        public class Query : IRequest<string[]> {}
        
                public class Handler : IRequestHandler<Query, string[]>
                {
                    private readonly DataContext _context;
        
        
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<string[]> Handle(Query request, CancellationToken cancellationToken)
                    {
                        return await _context.Users.Where(d => d.IsDoctor == true).Select(u => u.UserName).ToArrayAsync();
                    }
                }
    }
}