export class AppService {


    public async getPreferences(): Promise<any> {
        const response = await fetch('/api/preferences');
        console.log(response.status);
        
        return await response.json();
    }

    public async setPreferences(prefs: any) {
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({prefs})
          });
        return await response.json();
    }

    public async getWorkshops() : Promise<any> {
        const response = await fetch('/pajautin-data.json');
        return await response.json();
    }

}