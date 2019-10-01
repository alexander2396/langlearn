export class WordsListQuery {
    languageId: number;
    skip: number;
    take: number;
    forPractice: boolean;
    activeOnly: boolean;
    wordCategoryId: number;

    constructor (languageId: number, skip: number = 0, take: number = 10) {
        this.languageId = languageId;
    }
}