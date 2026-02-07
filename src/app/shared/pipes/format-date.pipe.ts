import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    return new Date(value).toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  }
}
