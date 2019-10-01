using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Langlearn.Application.Interfaces;
using Langlearn.Domain.Entities.WestLanguages;
using Langlearn.Infrastructure.TextToSpeech;
using Langlearn.Application.Infrastructure.Providers;

namespace Langlearn.Application.WestLanguages.Words.Commands.CreateWord
{
	public class CreateWordCommand : IRequest
	{
		public int LanguageId { get; set; }
		public string Text { get; set; }
		public string Translation { get; set; }
        public int? WordCategoryId { get; set; }

        public class Handler : IRequestHandler<CreateWordCommand, Unit>
		{
			private readonly ILanguagerContext _context;
            private readonly ITextToSpeechService _textToSpeechService;
            private readonly IAuthorizationProvider _authorizationProvider;

            public Handler(ILanguagerContext context, ITextToSpeechService textToSpeechService, IAuthorizationProvider authorizationProvider)
			{
				_context = context;
                _textToSpeechService = textToSpeechService;
                _authorizationProvider = authorizationProvider;
            }

			public async Task<Unit> Handle(CreateWordCommand request, CancellationToken cancellationToken)
			{
                var user = await _authorizationProvider.GetCurrentUser();
				var entity = new Word(request.LanguageId, request.Text.ToLower(), request.Translation.ToLower(), user.Id, request.WordCategoryId);

				_context.Words.Add(entity);

				await _context.SaveChangesAsync(cancellationToken);

                await _textToSpeechService.GenerateSpeechFile(entity.Text, $"wwwroot/Assets/Mp3/{entity.Text}.mp3");

                return Unit.Value;
			}
		}
	}
}
