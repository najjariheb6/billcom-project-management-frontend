import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {  MatDialogModule} from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {  MatCardModule } from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
    
  ] ,
  exports: [
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,MatInputModule
  ]

  })
export class MaterialModuleModule { }
