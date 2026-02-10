import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NotFoundComponent],
})
export class SharedModule {}
