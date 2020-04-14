import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: 'idea/create',
    pathMatch: 'full',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'idea/detail/:id',
    pathMatch: 'full',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'idea/edit/:id',
    pathMatch: 'full',
    component: EditComponent,
    canActivate: [AuthGuard]
  }
]

export const IdeaRoutingModule = RouterModule.forChild(routes);
