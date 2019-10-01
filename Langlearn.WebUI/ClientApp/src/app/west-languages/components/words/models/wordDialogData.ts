import { WordModel } from 'src/app/core/models/west-languages/word.model';
import { WordCategoryModel } from 'src/app/core/models/west-languages/wordCategory.model';

export class WordDialogData {
    dialogTitle: string;
    word: WordModel;
    wordCategories: WordCategoryModel[];
}