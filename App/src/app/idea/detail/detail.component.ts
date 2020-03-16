import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Idea } from 'src/app/models/Idea';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  commentform : FormGroup;
  ideaDetails$: Observable<Idea>;
  isIdeaLoaded: boolean = false;
  notificationMessage = "Loading idea...";
  ideaLikes = 0;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder) {
      this.commentform = this.fb.group({
        newComment: ['']
      });
   }

   ngOnInit(){
    this.ideaDetails$ = this.dataService.getIdeaById$(this.route.snapshot.params.id)
    .pipe(finalize(()=>{
      this.isIdeaLoaded = true;
    }));
   }

  IsUserPublisher(id:string): boolean {
    let res = this.authService.activeUser._id == id    
    return res
  }

  get IfThereIsUser(){
    console.log(this.authService.activeUser);
    
    return this.authService.activeUser;
  }

  deleteIdea(ideaID: string){
    this.dataService.removeIdeaById(ideaID)
    .then(()=>{
      this.router.navigate(["/"]);
    });
  }

  likeIdea(idea:Idea) {
    let res = this.dataService.likeIdea(idea,this.authService.activeUser._id)
  }
  commentIdea(idea:Idea) {
    let res = this.dataService.commentIdea(idea,this.authService.activeUser.username,this.commentform.controls.newComment.value)
    this.commentform.reset();
  }
}
