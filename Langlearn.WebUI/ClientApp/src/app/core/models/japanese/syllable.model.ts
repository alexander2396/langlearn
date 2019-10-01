import { SyllabaryType } from '../../enums/syllabaryType';

export class SyllableModel {
    id: number;
    value: string;
    transliteration: string;
    syllabaryType: SyllabaryType;
    isActive: boolean;
}