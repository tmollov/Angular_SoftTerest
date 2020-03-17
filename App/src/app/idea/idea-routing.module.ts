import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { AuthGuard } from '../guards/auth.guard';
import { DetailComponent } from './detail/detail.component';


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
  }
]

export const IdeaRoutingModule = RouterModule.forChild(routes);
