
import { APIResponseType } from 'types/global';
import { TodoBase } from 'types/todo';

export async function todoFetch(): Promise<APIResponseType<TodoBase[]>> {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`);
    return response.json();
}

export async function updateTodoFetch(data:TodoBase) {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    })

    return response.json();
}