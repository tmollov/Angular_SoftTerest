import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/components/shared/models/User';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEntitiesLoaded = false;
  returnUrl: string;
  //ideasNames: 
  items;
  IsEditing = false;
  profilePicForm: FormGroup;
  loading = false;
  usersRef: CollectionReference;
  photo: Observable<any>;

  constructor(public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private rb: FormBuilder,
    private firestore: AngularFirestore) {

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

    let user = JSON.parse(localStorage.getItem('user'))
    this.items = this.firestore.collection<User>('users').ref;
    // this.items
    //   .pipe(map((data) => {
    //     this.photo = data[2].photoURL;
    //     console.log(data);
    //     return data;
    //   }));
    //this.ideasNames = this.dataService.getUserIdeas$(this.authService.activeUser._id)
    //.pipe(finalize(()=>{
    //  this.isEntitiesLoaded = true;
    //}));
  }

  toggleEdit() {
    this.IsEditing = !this.IsEditing;
  }

  onSubmit() {
    this.loading = true;
  }

  get f() {
    return this.profilePicForm.controls;
  }

  // TODO:
  get username() {
    return this.authService.GetUserUsernameByEmail;
  }
}