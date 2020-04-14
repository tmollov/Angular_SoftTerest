import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public isLogingOut = false;
  constructor(public authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.isLogingOut = true;
    this.authService.SignOut()
    .then(()=>{
      this.isLogingOut = false;
    });
  }
}
