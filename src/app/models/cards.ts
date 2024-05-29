export class Cards {
    id: number;
    webviewPath?: string;
    subtitle?: string;

    constructor(id: number, webviewPath?: string, subtitle?: string){
        this.id = id;
        this.webviewPath = webviewPath;
        this.subtitle = subtitle;
    }
}