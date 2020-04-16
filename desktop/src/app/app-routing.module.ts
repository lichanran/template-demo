import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { environment } from '../environments/environment'


const appRoutes: Routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )   
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
