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
    let mime = 'image/png';

    if (image.startsWith('/9j/')) mime = 'image/jpeg';
    else if (image.startsWith('UklGR')) mime = 'image/webp';
    else if (image.startsWith('PHN2Zy')) mime = 'image/svg+xml';

    return `data:${mime};base64,${image}`;
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
