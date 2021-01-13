using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediatr;
        public ChatHub(IMediator mediatr)
        {
            _mediatr = mediatr;

        }
        public async Task SendComment(Create.Command command)
        {
            var Username = Context.User?.Claims?.FirstOrDefault(x => x.Type ==
             ClaimTypes.NameIdentifier)?.Value;

             command.Username = Username;
             var comment = await _mediatr.Send(command);

             await Clients.All.SendAsync("ReceiveComment", comment);
        }
    }
}