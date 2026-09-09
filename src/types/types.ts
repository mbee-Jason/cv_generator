export type Formation = {
    id: number;
    degree: string;
    institution: string;
    startYear: number;
    endYear: number;
}

export type Experience = {
    id: number;
    place: string;
    jobTitle: string;
    description: string;
    startYear: number;
    endYear: number;
}

export type Skill = {
    id: number,
    skillTitle: string;
}