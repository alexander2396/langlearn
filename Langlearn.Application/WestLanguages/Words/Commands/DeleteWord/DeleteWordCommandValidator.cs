using FluentValidation;

namespace Langlearn.Application.WestLanguages.Words.Commands.DeleteWord
{
	public class DeleteWordCommandValidator : AbstractValidator<DeleteWordCommand>
	{
		public DeleteWordCommandValidator()
		{
			RuleFor(v => v.Id).NotEmpty();
		}
	}
}
