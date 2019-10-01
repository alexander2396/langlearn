using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.WestLanguages.WordCategories.Commands.UpdateWordCategory
{
    public class UpdateWordCategoryCommand : IRequest
    {
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public string Name { get; set; }

        public class Handler : IRequestHandler<UpdateWordCategoryCommand, Unit>
        {
            private readonly ILanguagerContext _context;

            public Handler(ILanguagerContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateWordCategoryCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.WordCategories.SingleOrDefaultAsync(w => w.Id == request.Id, cancellationToken);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(WordCategory), request.Id);
                }

                entity.Update(request.Name);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
