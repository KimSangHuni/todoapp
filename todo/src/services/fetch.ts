
import { Filter } from 'components/FilterComponent';
import { APIResponseType } from 'types/global';
import { TodoBase } from 'types/todo';

export async function todoFetch(filter:Filter[]): Promise<APIResponseType<TodoBase[]>> {
    const queryString = filter.map(list => `${list.content}=${encodeURIComponent(String(list.value))}`).join('&');
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos?${queryString}`);
    return response.json();
}


export async function insertTodoFetch(data:TodoBase) {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    })

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

export async function deleteTodoFetch(_id:string) {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
    })

    return response.json();
}
