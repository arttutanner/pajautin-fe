import { API_SERVER } from "../types/Constants";
import axios, { Axios } from "axios";

export class AppService {

   

    public AppService() {
        
    }

    public async getPreferences(): Promise<any> {

        
        return await (await axios.get('/api/preferences')).data;
        
    }

    public async setPreferences(prefs: any) {

        return await (await axios.post('/api/preferences',prefs)).data;
/*)
        const response = await fetch(API_SERVER+`/api/preferences`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prefs),
            credentials: 'same-origin'
          });
        return await response.json(); */
    }

    public async getWorkshops() : Promise<any> {
        const response = await fetch('/pajautin-data.json', {credentials: 'same-origin'});
        return await response.json();
    }

    public async doLogin(userId : string) : Promise<any> {

        return await (await axios.post('/api/login/',userId)).data;
        /*
        const response = await fetch(API_SERVER+`/api/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: userId
          });
        return await response.json();
        */
    }


}