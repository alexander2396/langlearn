using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;

namespace Langlearn.Application.WestLanguages.Words.Commands.DeleteWord
{
	public class DeleteWordCommand : IRequest
	{
		public int Id { get; set; }

		public class DeleteWordCommandHandler : IRequestHandler<DeleteWordCommand>
		{
			private readonly IWestLanguagesContext _context;

			public DeleteWordCommandHandler(IWestLanguagesContext context)
			{
				_context = context;
			}

			public async Task<Unit> Handle(DeleteWordCommand request, CancellationToken cancellationToken)
			{
				var entity = await _context.Words.FindAsync(request.Id);

				if (entity == null)
				{
					throw new NotFoundException(nameof(Word), request.Id);
				}

				_context.Words.Remove(entity);

				await _context.SaveChangesAsync(cancellationToken);

				return Unit.Value;
			}
		}
	}
}
