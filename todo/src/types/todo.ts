export interface TodoBase {
    idx: number;
    title: string;
    description?: string;
    createAt: Date;
    deadline: Date;
}

