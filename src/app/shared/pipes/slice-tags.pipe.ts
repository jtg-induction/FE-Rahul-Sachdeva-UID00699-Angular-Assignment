import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTags',
})
export class SliceTagsPipe implements PipeTransform {
  transform(tags: string[], limit: number): string[] {
    return tags.slice(0, limit);
  }
}
