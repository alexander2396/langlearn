using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Application.Exceptions;
using Langlearn.Infrastructure.TextToSpeech;

namespace Langlearn.Application.WestLanguages.Words.Commands.UpdateWord
{
	public class UpdateWordCommand : IRequest
	{
		public int Id { get; set; }
		public int LanguageId { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }
        public int? WordCategoryId { get; set; }

        public class Handler : IRequestHandler<UpdateWordCommand, Unit>
		{
            private readonly ILanguagerContext _context;
            private readonly ITextToSpeechService _textToSpeechService;

            public Handler(ILanguagerContext context, ITextToSpeechService textToSpeechService)
            {
                _context = context;
                _textToSpeechService = textToSpeechService;
            }

            public async Task<Unit> Handle(UpdateWordCommand request, CancellationToken cancellationToken)
			{
				var entity = await _context.Words.SingleOrDefaultAsync(w => w.Id == request.Id, cancellationToken);

				if (entity == null)
				{
					throw new NotFoundException(nameof(Word), request.Id);
				}

                if (entity.Text != request.Text)
                {
                    File.Delete($"wwwroot/Assets/Mp3/{entity.Text}.mp3");
                    _textToSpeechService.GenerateSpeechFile(request.Text, $"wwwroot/Assets/Mp3/{request.Text}.mp3");
                }   

                entity.Update(request.Text.ToLower(), request.Translation.ToLower(), request.WordCategoryId);

				await _context.SaveChangesAsync(cancellationToken);

				return Unit.Value;
			}
		}
	}
}
