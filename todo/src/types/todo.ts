export interface TodoBase {
    _id: number;
    title: string;
    createAt: Date | string;
    deadline: Date | string;
    description?: string;
    favorite: boolean;
}

