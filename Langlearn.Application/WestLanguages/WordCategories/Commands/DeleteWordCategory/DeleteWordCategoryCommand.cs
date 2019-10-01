using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.WestLanguages.WordCategories.Commands.DeleteWordCategory
{
    public class DeleteWordCategoryCommand : IRequest
    {
        public int Id { get; set; }

        public class DeleteWordCommandHandler : IRequestHandler<DeleteWordCategoryCommand>
        {
            private readonly ILanguagerContext _context;

            public DeleteWordCommandHandler(ILanguagerContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteWordCategoryCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.WordCategories.FindAsync(request.Id);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(WordCategory), request.Id);
                }

                _context.WordCategories.Remove(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
