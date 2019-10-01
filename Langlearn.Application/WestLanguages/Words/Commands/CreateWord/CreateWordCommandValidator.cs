using FluentValidation;
using System.Text.RegularExpressions;

namespace Langlearn.Application.WestLanguages.Words.Commands.CreateWord
{
	public class CreateWordCommandValidator : AbstractValidator<CreateWordCommand>
	{
		public CreateWordCommandValidator()
		{
			RuleFor(x => x.Text).Must(x => Regex.IsMatch(x, @"^[a-zA-Z|\s]+$")).MaximumLength(50).NotEmpty();
			RuleFor(x => x.Translation).Must(x => Regex.IsMatch(x, @"^[\p{L}\s|,]+$")).MaximumLength(50).NotEmpty();
			RuleFor(x => x.LanguageId).NotEmpty();
		}
	}
}
