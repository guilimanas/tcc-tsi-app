export class UserPhoto {
    id: number;
    filepath: string;
    webviewPath?: string;
    subtitle?: string;

    constructor(id: number, filepath: string, webviewPath?: string, subtitle?: string){
        this.id = id;
        this.filepath = filepath;
        this.webviewPath = webviewPath;
        this.subtitle = subtitle;
    }
}