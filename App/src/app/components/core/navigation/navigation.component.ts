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

  // TODO: REF
  logout() {
    this.isLogingOut = true;
    this.authService.SignOut()
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
