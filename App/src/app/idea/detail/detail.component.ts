import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Idea } from 'src/app/shared/models/Idea';
import { DataService } from 'src/app/core/services/data.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  commentform: FormGroup;

  ideaDetails$: Observable<Idea>;
  ideaModel: Idea;
  ideaDescriptionList: any[];
  editLink: string;
  ideaLikes = 0;

  isIdeaLoaded: boolean = false;
  notificationMessage = "Loading idea...";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.commentform = this.fb.group({
      newComment: ['']
    });
  }

  ngOnInit() {
    this.ideaDetails$ = this.dataService.getIdeaById$(this.route.snapshot.params.id)
      .pipe(map((data) => {
        this.isIdeaLoaded = true;
        this.editLink = "/idea/edit/" + this.route.snapshot.params.id;
        this.ideaModel = data;
        this.ideaDescriptionList = data.description.split("\n");
        return data;
      }));
    this.ideaDetails$.subscribe();
  }

  IsUserPublisher(id: string): boolean {
    let res = this.authService.activeUser._id == id
    return res
  }

  get IfThereIsUser() {
    return this.authService.activeUser;
  }

  deleteIdea(ideaID: string) {
    this.dataService.removeIdeaById(ideaID)
      .then(() => {
        this.router.navigate(["/"]);
      });
  }

  likeIdea(idea: Idea) {
    let res = this.dataService.likeIdea(idea, this.authService.activeUser._id)
  }
  commentIdea(idea: Idea) {
    let res = this.dataService.commentIdea(idea, this.authService.activeUser.username, this.commentform.controls.newComment.value)
    this.commentform.reset();
  }
}
