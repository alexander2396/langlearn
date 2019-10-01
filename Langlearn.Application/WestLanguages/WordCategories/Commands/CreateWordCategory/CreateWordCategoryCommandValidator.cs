using FluentValidation;

namespace Langlearn.Application.WestLanguages.WordCategories.Commands.CreateWordCategory
{
    public class CreateWordCategoryCommandValidator : AbstractValidator<CreateWordCategoryCommand>
    {
        public CreateWordCategoryCommandValidator()
        {
            RuleFor(x => x.Name).MaximumLength(100).NotEmpty();
            RuleFor(x => x.LanguageId).NotEmpty();
        }
    }
}
