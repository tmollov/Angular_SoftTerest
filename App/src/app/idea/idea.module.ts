import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';



@NgModule({
  declarations: [CreateComponent, DetailComponent],
  imports: [
    CommonModule
  ]
})
export class IdeaModule { }
