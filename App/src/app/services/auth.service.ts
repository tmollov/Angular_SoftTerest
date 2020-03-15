import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService  } from 'kinvey-angular-sdk';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public User;

  constructor(private http: HttpClient,
    private userService: UserService) { }

  get activeUser() {
    return this.userService.getActiveUser();
  }
  async me() {
    try {
      if (this.activeUser) {
        await this.activeUser.me();
      }
      return this.activeUser;
    } catch (error) {
      console.log(error);
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userService.login(username, password);
      return user;
    } catch (error) {
      return error;
    }
  }

  async signup(username: string, password: string ) {
    try {
      const user = await this.userService.signup({
        username: username,
        password: password
      },);
      return user;
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      await this.userService.logout();
    } catch (error) {
      debugger
      return error;
    }
  }
}
