import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  get IsUserLogged(){
    return Boolean(this.authService.activeUser);
  }

  logout() {
    this.authService.logout()
    .then((data)=>{
      console.log(data);
      this.router.navigate(['/']);
    });
  }

}
