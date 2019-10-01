using FluentValidation;
using System.Text.RegularExpressions;

namespace Langlearn.Application.WestLanguages.Words.Commands.UpdateWord
{
	public class UpdateWordCommandValidator : AbstractValidator<UpdateWordCommand>
	{
		public UpdateWordCommandValidator()
		{
			RuleFor(x => x.Id).NotEmpty();
			RuleFor(x => x.Text).Must(x => Regex.IsMatch(x, @"^[a-zA-Z|\s]+$")).MaximumLength(50).NotEmpty();
			RuleFor(x => x.Translation).Must(x => Regex.IsMatch(x, @"^[\p{L}\s|,]+$")).MaximumLength(50).NotEmpty();
			RuleFor(x => x.LanguageId).NotEmpty();
		}
	}
}
