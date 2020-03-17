import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { IdeaRoutingModule } from './idea-routing.module';



@NgModule({
  declarations: [CreateComponent, DetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    IdeaRoutingModule,
  ]
})
export class IdeaModule { }
