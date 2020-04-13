import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEntitiesLoaded = false;
  returnUrl: string;
  ideasNames;
  items;
  IsEditing = false;
  profilePicForm: FormGroup;
  loading = false;
  photo: Observable<any>;

  constructor(public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private rb: FormBuilder) {

    this.profilePicForm = this.rb.group({
      picture: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // TODO: add redirect guard
    if (!this.authService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
    this.photo = this.authService.GetUserPhoto
      .pipe(map((data) => {
        this.profilePicForm.controls.picture.setValue(data);
        return data;
      }));
      this.dataService.getUserIdeas(this.authService.GetUserId)
      .then((data)=>{
        this.ideasNames = data.docs;
        this.isEntitiesLoaded = true;
      });
  }

  toggleEdit() {
    this.IsEditing = !this.IsEditing;
  }

  onSubmit() {
    this.loading = true;
    this.authService.SetUserPhoto(this.f.picture.value)
    .then(()=>{
      this.IsEditing = false;
      this.loading = false;
    })
  }

  get f() {
    return this.profilePicForm.controls;
  }

  get username() {
    return this.authService.GetUserUsernameByEmail;
  }
}