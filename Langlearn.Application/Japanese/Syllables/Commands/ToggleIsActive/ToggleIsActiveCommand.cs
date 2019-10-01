using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.Japanese;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.Japanese.Syllables.Commands.ToggleIsActive
{
    public class ToggleIsActiveCommand : IRequest
    {
        public int Id { get; set; }

        public class Handler : IRequestHandler<ToggleIsActiveCommand, Unit>
        {
            private readonly ILanguagerContext _context;

            public Handler(ILanguagerContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(ToggleIsActiveCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.Syllables.FindAsync(request.Id);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Syllable), request.Id);
                }

                entity.ToggleIsActive();

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
