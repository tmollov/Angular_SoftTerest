import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isLogingOut = false;
  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  get IsUserLogged() {
    return Boolean(this.authService.activeUser);
  }

  logout() {
    this.isLogingOut = true;
    this.authService.logout()
    .then((data) => {
      console.log(data);
      this.isLogingOut = false;
      this.router.navigate(['/']);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
