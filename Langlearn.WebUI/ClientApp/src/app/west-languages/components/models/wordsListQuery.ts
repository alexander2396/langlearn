export class WordsListQuery {
    languageId: number;
    skip: number;
    take: number;
    randomOrder: boolean;

    constructor (languageId: number) {
        this.languageId = languageId;
    }
}