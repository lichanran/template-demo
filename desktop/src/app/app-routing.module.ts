import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const appRoutes: Routes = [

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: !environment.production }
    )   
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
