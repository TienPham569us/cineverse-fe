import RegisterParams from "@/types/register.params";
import { ENDPOINTS } from "./EndPoints";
import * as dotenv from 'dotenv';

dotenv.config();
const BACKEND_BASE_URL: string = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://exclusive-neile-tthuytruc-6a5d7e3f.koyeb.app'; //'http://localhost:8080'; //

export class ApiManager {
  private static isRefreshing = false;
  private static refreshSubscribers: Array<(token: string) => void> = [];

  private static onRrefreshed(token: string) {
    ApiManager.refreshSubscribers.map((callback) => callback(token));
  }

  private static addRefreshSubscriber(callback: (token: string) => void) {
    ApiManager.refreshSubscribers.push(callback);
  }

  private static async refreshToken(refreshToken: string): Promise<string> {
    const response = await fetch(`${BACKEND_BASE_URL}/user/refreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data.id_token;
  }

  private static async fetchWithRefresh(url: string, options: RequestInit, refreshToken: string): Promise<Response> {
    try {
      const response = await fetch(url, options);
      if (response.status === 401) {
        if (!ApiManager.isRefreshing) {
          ApiManager.isRefreshing = true;
          const newToken = await ApiManager.refreshToken(refreshToken);
          ApiManager.isRefreshing = false;
          ApiManager.onRrefreshed(newToken);
        }

        return new Promise((resolve) => {
          ApiManager.addRefreshSubscriber(async (token: string) => {
            options.headers = {
              ...options.headers,
              'Authorization': `Bearer ${token}`,
            };
            resolve(fetch(url, options));
          });
        });
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  private mergeHeaders(customHeaders?: any): Headers {
    const defaultHeaders = {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return new Headers({ ...defaultHeaders, ...customHeaders });
  }

  static async get(endpoint: string, headers?: any, refreshToken?: string, base_url?: string): Promise<any> {
    try {
      if (!base_url) {
        base_url = BACKEND_BASE_URL;
      }
      let response;
      if (refreshToken) {
        const options: RequestInit = {
          method: 'GET',
          headers: headers,
        };
        response = await this.fetchWithRefresh(`${base_url}/${endpoint}`, options, refreshToken);
      } else {
        response = await fetch(`${base_url}/${endpoint}`,{
          headers: headers,
        });
      }
      
      // if (!response.ok) {
      //   console.log("Response: ", response);
      //   const errorData = await response.json();
      //   throw new Error(JSON.stringify(errorData));
      // }
      return response.json();
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    } 
  }
  static async post(endpoint: string, data: any, headers?: any, refreshToken?: string, base_url?: string): Promise<any> {
    try {
      if (!base_url) {
        base_url = BACKEND_BASE_URL;
      }
      let response;
      if (refreshToken) {
        const options: RequestInit = {
          method: 'POST',
          headers: headers,
        };
        response = await this.fetchWithRefresh(`${base_url}/${endpoint}`, options, refreshToken);
      } else {
        console.log("Endpoint: ", `${base_url}/${endpoint}`);
        response = await fetch(`${base_url}/${endpoint}`, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          headers: (headers),
          body: JSON.stringify(data),
        });
      }
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(JSON.stringify(errorData));
      // }
      
      return response.json();
    } catch (error) {
      throw error;
    } 
  }
  static async put(endpoint: string, data: any, headers?: any, refreshToken?: string, base_url?: string): Promise<any> {
    try {
      if (!base_url) {
        base_url = BACKEND_BASE_URL;
      }
      let response;
      if (refreshToken) {
        const options: RequestInit = {
          method: 'PUT',
          headers: headers,
        };
        response = await this.fetchWithRefresh(`${base_url}/${endpoint}`, options, refreshToken);
      } else {
        response = await fetch(`${base_url}/${endpoint}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(data),
        });
      }
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(JSON.stringify(errorData));
      // }
      return response.json();
    } catch (error) {
      throw error;
    } 
  }
  static async delete(endpoint: string, headers?: any, refreshToken?: string, base_url?: string): Promise<any> {
    try {
      if (!base_url) {
        base_url = BACKEND_BASE_URL;
      }
      let response;
      if (refreshToken) {
        const options: RequestInit = {
          method: 'PUT',
          headers: headers,
        };
        response = await this.fetchWithRefresh(`${base_url}/${endpoint}`, options, refreshToken);
      } else {
        response = await fetch(`${base_url}/${endpoint}`, {
          method: 'DELETE',
          headers: headers,
        });
      }
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(JSON.stringify(errorData));
      // }
      return response.json();
    } catch (error) {
      throw error;
    } 
  }

  static register = async (params: RegisterParams): Promise<any> => {
      //const url = `${base_url}/${ENDPOINTS.REGISTER}`;
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };
      return this.post(ENDPOINTS.REGISTER, params, headers);
  }
}