import { SyllabaryType } from 'src/app/core/enums/syllabaryType';

export class SyllablesListQuery {
    syllabaryType: SyllabaryType;
    skip: number;
    take: number;
    randomOrder: boolean;
    activeOnly: boolean;

    constructor (syllabaryType: SyllabaryType) {
        this.syllabaryType = syllabaryType;
    }
}