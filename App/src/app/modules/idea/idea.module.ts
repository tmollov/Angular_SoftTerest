import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaRoutingModule } from './idea-routing.module';
import { EditComponent } from './edit/edit.component';
import { CoreModule } from '../../modules/core/core.module';



@NgModule({
  declarations: [CreateComponent, DetailComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    IdeaRoutingModule
  ]
})
export class IdeaModule { }
