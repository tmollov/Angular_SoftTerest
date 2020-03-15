import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForum = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    repassword: new FormControl()
  });

  loading = false;
  returnUrl: string;

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    if (this.authService.activeUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.registerForum.controls;
  }

  onSubmit() {
    // stop if form is invalid
    if (this.registerForum.invalid) {
      return;
    }
    this.loading = true;

    //TODO: remove loading similations
    setTimeout(() => {
      this.authService
        .signup(this.f.username.value, this.f.password.value)
        .then((data) => {
          console.log(data);
          this.loading = false;
          this.router.navigate(['/']);
        })
    }, 1500)
  }
}
