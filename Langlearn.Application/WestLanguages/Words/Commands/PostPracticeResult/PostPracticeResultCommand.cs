using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.WestLanguages.Words.Commands.PostPracticeResult
{
    public class PostPracticeResultCommand : IRequest
    {
        public int[] Correct { get; set; }
        public int[] Wrong { get; set; }

        public class PostPracticeResultCommandHandler : IRequestHandler<PostPracticeResultCommand>
        {
            private readonly ILanguagerContext _context;

            public PostPracticeResultCommandHandler(ILanguagerContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(PostPracticeResultCommand request, CancellationToken cancellationToken)
            {
                var correctWords = await _context.Words.Where(w => request.Correct.Contains(w.Id)).ToListAsync();
                var wrongWords = await _context.Words.Where(w => request.Wrong.Contains(w.Id)).ToListAsync();
  
                foreach (var word in correctWords)
                {
                    word.UpdateCount(true);
                }

                foreach (var word in wrongWords)
                {
                    word.UpdateCount(false);
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
