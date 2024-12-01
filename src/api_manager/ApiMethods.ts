export class ApiMethods {
    static async apiRequest(method: string, url: string, body={}) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        });
    }

    static async get(url: string) {
        return await this.apiRequest('GET', url);
    }

    static async post(url: string, body: any) {
        return await this.apiRequest('POST', url, body);
    }

    static async put(url: string, body: any) {      
        return await this.apiRequest('PUT', url, body);
    }
    
    static async delete(url: string) {
        return await this.apiRequest('DELETE', url);
    }
}