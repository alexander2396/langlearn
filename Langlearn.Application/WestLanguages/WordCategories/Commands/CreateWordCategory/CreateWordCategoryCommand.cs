using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.WestLanguages.WordCategories.Commands.CreateWordCategory
{
    public class CreateWordCategoryCommand : IRequest
    {
        public string Name { get; set; }
        public int LanguageId { get; set; }

        public class Handler : IRequestHandler<CreateWordCategoryCommand, Unit>
        {
            private readonly ILanguagerContext _context;

            public Handler(ILanguagerContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(CreateWordCategoryCommand request, CancellationToken cancellationToken)
            {
                var entity = new WordCategory(request.LanguageId, request.Name);

                _context.WordCategories.Add(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
