import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStoreModule } from './user-store/user-store.module';
import { MarketStoreModule } from './market-store/market-store.module';
import { ModelStoreModule } from './model-store/model-store.module';
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserStoreModule,
    MarketStoreModule,   
    ModelStoreModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
  ]
})
export class RootStoreModule { }
