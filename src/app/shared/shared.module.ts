import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  declarations: [NavbarComponent, FormatDatePipe],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [NavbarComponent, FormatDatePipe, RouterModule],
})
export class SharedModule {}
