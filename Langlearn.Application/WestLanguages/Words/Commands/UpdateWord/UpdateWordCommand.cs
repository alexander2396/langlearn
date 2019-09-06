using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.WestLanguages.Words.Commands.UpdateWord
{
	public class UpdateWordCommand : IRequest
	{
		public int Id { get; set; }
		public int LanguageId { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }

		public class Handler : IRequestHandler<UpdateWordCommand, Unit>
		{
			private readonly IWestLanguagesContext _context;

			public Handler(IWestLanguagesContext context)
			{
				_context = context;
			}

			public async Task<Unit> Handle(UpdateWordCommand request, CancellationToken cancellationToken)
			{
				var entity = await _context.Words.SingleOrDefaultAsync(w => w.Id == request.Id, cancellationToken);

				if (entity == null)
				{
					throw new NotFoundException(nameof(Word), request.Id);
				}

				entity.Text = request.Text;
				entity.Translation = request.Translation;

				await _context.SaveChangesAsync(cancellationToken);

				return Unit.Value;
			}
		}
	}
}
