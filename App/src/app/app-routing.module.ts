import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './core/notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './idea/create/create.component';
import { DetailComponent } from './idea/detail/detail.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'idea/create',
    pathMatch: 'full',
    component: CreateComponent
  },
  {
    path: 'idea/detail',
    pathMatch: 'full',
    component: DetailComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
]

export const AppRoutingModule = RouterModule.forRoot(routes);
