import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// TODO: add validation for form
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  notificationMessage: string;
  loading = false;
  returnUrl: string;
  usernamePattern : string = "[A-Za-z]{6,}"

  constructor(public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        username: ['' ,[Validators.required,Validators.minLength(6),Validators.pattern(this.usernamePattern)]],
        password: ['',[Validators.required,Validators.minLength(6)]]
      });

    if (this.authService.activeUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loading = true;

    this.authService
      .login(this.f.username.value,
        this.f.password.value)
      .then((data) => {
        this.loading = false;
        console.log(JSON.stringify(data));
        
        if (data.name == "InvalidCredentialsError") {
          this.loginForm.reset();
          this.notificationMessage = "Invalid Credentials!";
          setTimeout(() => {
            this.notificationMessage = null;
          }, 5000);
          return;
        }
        this.router.navigate(['/']);
      });
  }

}
