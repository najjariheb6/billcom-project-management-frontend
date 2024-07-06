import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

import { SpinnerComponent } from './spinner/spinner.component';
import { CommunSharedModule } from '../commun-shared/commun-shared.module';
import { CardFormComponent } from './card-form/card-form.component';

@NgModule({
  declarations: 
  [FooterComponent, 
  HeaderComponent, 
  SidebarComponent, SpinnerComponent,SpinnerComponent, CardFormComponent],
  imports: [
    CommonModule,
    RouterModule,
CommunSharedModule
  ],
 
  exports: [
      HeaderComponent,
      SidebarComponent,
      FooterComponent ,
      SpinnerComponent,
      CardFormComponent,
  ],

})
export class SharedModule { }
