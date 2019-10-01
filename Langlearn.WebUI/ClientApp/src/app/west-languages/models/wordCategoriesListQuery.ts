export class WordCategoriesListQuery {
    languageId: number;
    skip: number;
    take: number;

    constructor (languageId: number, skip: number = 0, take: number = 10) {
        this.languageId = languageId;
    }
}