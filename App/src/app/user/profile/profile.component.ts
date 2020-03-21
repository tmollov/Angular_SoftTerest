import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Idea } from '../../shared/models/Idea';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { map, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEntitiesLoaded = false;
  returnUrl: string;
  ideasNames: Observable<Idea[]>;
  IsEditing = false;
  profilePicForm: FormGroup;
  imageUrlPattern = /^[hH][tT][tT][pP][sS]*:\/\/.*/;
  notification;
  loading = false;
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private rb: FormBuilder) {
      this.profilePicForm = this.rb.group({
        picture:[this.profilePic,[Validators.required,Validators.pattern(this.imageUrlPattern,)]]
      });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (!this.authService.activeUser) {
      this.router.navigate([this.returnUrl]);
    }
    this.ideasNames = this.dataService.getUserIdeas$(this.authService.activeUser._id)
    .pipe(finalize(()=>{
      this.isEntitiesLoaded = true;
    }));
  }

  toggleEdit() {
    this.IsEditing = !this.IsEditing;
  }

  onSubmit(){
    this.loading = true;
    this.authService.updateProfilePicture(this.form.picture.value)
    .then((data)=>{
      this.loading = false;
      this.profilePicForm.reset();
      this.IsEditing = false;
    });
  }

  get form(){
    return this.profilePicForm.controls;
  }

  get username() {
    return this.authService.activeUser.username;
  }

  get profilePic() {
    return this.authService.activeUser.data.pictureUrl;
  }


}
