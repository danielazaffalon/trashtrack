import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { IPhoto } from '../model/interfaces';

@Injectable({
  providedIn: 'root'  
})

export class PhotoService {

  constructor() { }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async takePhoto(fileName = Date.now() + '.jpeg', size = {width: 400, height: 400}): Promise<IPhoto> {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      ...size
    });

    const base64Data = await this.readAsBase64(capturedPhoto);

    return {
      fileName,
      base64Data,
    };
  }
}
