using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Visits;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public VisitsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<VisitDto>>> List()
        {
            return await _mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<VisitDto>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task <ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
        
        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await _mediator.Send(new Attend.Command{Id = id});
        }
        [HttpDelete("{id}/attend")]
        public async Task <ActionResult<Unit>> Unattend(Guid id)
        {
            return await _mediator.Send(new Unattend.Command{Id = id});
        }
        
        [HttpGet("categories")]
        public async Task<ActionResult<string[]>> Categories()
        {
            return await _mediator.Send(new Categories.Query());
        }
        [HttpGet("myvisits")]
        public async Task<ActionResult<List<VisitDto>>> MyVisits()
        {
            return await _mediator.Send(new MyVisits.Query());
        }
    }
}