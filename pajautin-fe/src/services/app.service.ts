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

    }

    public async setPresent(pres: any) {

        return await (await axios.post('/api/presence',pres)).data;

    }


    public async getPresent(): Promise<any> {

        
        return await (await axios.get('/api/presence')).data;
        
    }


    public async getRegistration(): Promise<any> {

        return await (await axios.get('/api/registration')).data;
        
    }
    
    public async getProgramRegistration(): Promise<any> {
        return await (await axios.get('/api/program/registration')).data;
        
    }

    public async getWorkshops() : Promise<any> {
        const response = await fetch('/pajautin-data.json', {credentials: 'same-origin'});
        return await response.json();
    }


    public async getSchedule() : Promise<any> {
        const response = await fetch('/base-schedule.json', {credentials: 'same-origin'});
        return await response.json();
    }


    public async doLogin(userId : string) : Promise<any> {

        return await (await axios.post('/api/login/',userId)).data;

    }

    public async doLogout() : Promise<any> {

        return await (await axios.post('/api/logout/')).data;

    }



}