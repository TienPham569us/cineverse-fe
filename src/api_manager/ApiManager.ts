import RegisterParams from "@/types/register.params";
import { ENDPOINTS } from "./EndPoints";
import * as dotenv from 'dotenv';

dotenv.config();
const BACKEND_BASE_URL: string = process.env.BACKEND_BASE_URL || 'http://localhost:8080';

//const BACKEND_BASE_URL: string = 'https://be-week04-tienpham569us-projects.vercel.app';

export class ApiManager {
  
  private mergeHeaders(customHeaders?: any): Headers {
    const defaultHeaders = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return new Headers({ ...defaultHeaders, ...customHeaders });
  }

  static async get(endpoint: string, headers?: any): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/${endpoint}`,{
        headers: headers,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
      return response.json();
    } catch (error) {
      throw error;
    } 
  }
  static async post(endpoint: string, data: any, headers?: any): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/${endpoint}`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        headers: (headers),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
      
      return response.json();
    } catch (error) {
      throw error;
    } 
  }
  static async put(endpoint: string, data: any, headers?: any): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
      return response.json();
    } catch (error) {
      throw error;
    } 
  }
  static async delete(endpoint: string, headers?: any): Promise<any> {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: headers,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
      return response.json();
    } catch (error) {
      throw error;
    } 
  }

  static register = async (params: RegisterParams): Promise<any> => {
      //const url = `${BACKEND_BASE_URL}/${ENDPOINTS.REGISTER}`;
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };
      return this.post(ENDPOINTS.REGISTER, params, headers);
  }
}