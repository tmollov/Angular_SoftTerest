import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { IdeaModule } from './idea/idea.module';
import { AuthService } from './services/auth.service';
import { KinveyModule } from 'kinvey-angular-sdk';
import { Keys } from 'src/secret';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    IdeaModule,
    HomeModule,
    KinveyModule.init({
      appKey: Keys.AppId,
      appSecret: Keys.AppSecret
    })
  ],
  providers: [AuthService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
