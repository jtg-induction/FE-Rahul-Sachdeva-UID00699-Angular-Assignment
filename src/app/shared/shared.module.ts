import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { NavbarComponent } from './components/navbar';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  declarations: [NavbarComponent, FormatDatePipe],
  imports: [CommonModule, MatButtonModule],
  exports: [NavbarComponent, FormatDatePipe],
})
export class SharedModule {}
