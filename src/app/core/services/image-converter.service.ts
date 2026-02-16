import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageConverterService {
  toDisplayableUrl(image: string): string {
    if (!image) return '';

    if (image.startsWith('http') || image.startsWith('data:')) {
      return image;
    }

    return `data:image/png;base64,${image}`;
  }

  base64ToBlob(base64: string): Blob {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
