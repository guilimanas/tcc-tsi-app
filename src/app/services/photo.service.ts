import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { UserPhoto } from 'src/app/models/userphoto';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  router: Router;

  public photos: UserPhoto[] = [];
  public card: UserPhoto = new UserPhoto(0,'','','');

  private photo_storage: string = 'photos';
  private platform: Platform;

  constructor(platform: Platform, router: Router) {
    this.platform = platform;
    this.router = router;
  }

  // recuperar o maior ID para continuar a sequência
  private getMaxID(){
    let x: number[] = [];
    let v = 0;
    if (this.photos.length > 0) {
      for (let i = 0; i < this.photos.length; i++) {
        x.push(this.photos[i].id);
      }
      v = Math.max(...x)
    }
    return v;
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Save picture to file on device
  private async savePhoto(photo: Photo, t_subtitle?: string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        id: (this.getMaxID()+1),
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        subtitle: t_subtitle,
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        id: (this.getMaxID()+1),
        filepath: fileName,
        webviewPath: photo.webPath,
        subtitle: t_subtitle,
      };
    }
  }

  public async addNewToGallery(subtitle?: string) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });
  
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePhoto(capturedPhoto, subtitle);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: this.photo_storage
  ,
      value: JSON.stringify(this.photos),
    });

    //window.location.reload()
    this.router.navigate(['/', 'cards']);
  }

  public async updatePhoto(photo: UserPhoto, position: number, subtitle: string) {
    //console.log(">>>> ATUALIZAR: "+subtitle);
    this.photos[position].subtitle = subtitle;

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.photo_storage,
      value: JSON.stringify(this.photos)
    });

    this.router.navigate(['/', 'cards']);
  }

  public async deletePhoto(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.photo_storage,
      value: JSON.stringify(this.photos)
    });
  
    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
  
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const { value } = await Preferences.get({ key: this.photo_storage});
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];
  
    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data
        });
  
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
}