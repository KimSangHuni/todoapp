
import { APIResponseType } from 'types/global';
import { TodoBase } from 'types/todo';

export async function todoFetch():Promise<APIResponseType<TodoBase[]>> {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`);
    return response.json();
}