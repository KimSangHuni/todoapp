export interface TodoBase {
    _id: string;
    title: string;
    createAt: Date | string;
    deadline: Date | string;
    description?: string;
    favorite: boolean;
}

