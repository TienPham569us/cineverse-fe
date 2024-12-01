import RegisterParams from "@/types/register.params";
import { ENDPOINTS } from "./EndPoints";

const BASE_URL: string = 'http://localhost:3001';

//const BASE_URL: string = 'https://be-week04-tienpham569us-projects.vercel.app';

const getAuthToken = () => {
    const auth_token = localStorage.getItem('auth_token');
    return 'Bearer ' + auth_token;
}

export class ApiManager {
    
  async get(endpoint: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return response.json();
  }
  async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async put(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async delete(endpoint: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  }

    static register = async (params: RegisterParams): Promise<Response> => {
        const url = `${BASE_URL}/${ENDPOINTS.REGISTER()}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
    }
}