using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;

namespace Langlearn.Application.WestLanguages.Words.Commands.CreateWord
{
	public class CreateWordCommand : IRequest
	{
		public int Id { get; set; }
		public int LanguageId { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }

		public class Handler : IRequestHandler<CreateWordCommand, Unit>
		{
			private readonly IWestLanguagesContext _context;

			public Handler(IWestLanguagesContext context)
			{
				_context = context;
			}

			public async Task<Unit> Handle(CreateWordCommand request, CancellationToken cancellationToken)
			{
				var entity = new Word(request.LanguageId, request.Text, request.Translation);

				_context.Words.Add(entity);

				await _context.SaveChangesAsync(cancellationToken);

				return Unit.Value;
			}
		}
	}
}
