import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CreateComponent } from './idea/create/create.component';
import { DetailComponent } from './idea/detail/detail.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
]

export const AppRoutingModule = RouterModule.forRoot(routes);
