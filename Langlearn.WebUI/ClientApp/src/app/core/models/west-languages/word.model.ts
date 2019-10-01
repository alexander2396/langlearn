export interface WordModel {
    id: number;
    languageId: number;
    text: string;
    translation: string;
    wordCategoryId: number;
    isActive: boolean;
}