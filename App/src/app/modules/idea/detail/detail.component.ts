import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Idea } from 'src/app/components/shared/models/Idea';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/components/shared/models/Comment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  commentform: FormGroup;
  comments$: any[];
  ideaModel: Idea;
  ideaDescriptionList: any[];
  editLink: string;
  ideaLikes = 0;
  isIdeaLoaded: boolean = false;
  IsIdeaFound: boolean = true;
  IsUserLiked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    this.toastr.info("Loading idea");
    this.commentform = this.fb.group({
      newComment: ['',Validators.required]
    });

    this.dataService.LikesColl(this.route.snapshot.params.id);
    this.dataService.CommentsColl
      .subscribe((data: Comment[]) => {
        let a = data
          .filter(x => x.IdeaId == this.route.snapshot.params.id)
          .sort((a, b) => a.Timespan - b.Timespan);
        this.comments$ = a;
      });;
  }

  ngOnInit() {
    this.dataService.getIdeaById(this.route.snapshot.params.id)
      .then((data) => {
        if (data.data() == undefined) {
          this.IsIdeaFound = false;
          return;
        }

        this.editLink = "/idea/edit/" + this.route.snapshot.params.id;
        this.ideaModel = data.data();
        let description = data.data().description;
        this.ideaDescriptionList = description.split('\n');
        this.isIdeaLoaded = true;
        this.toastr.success("Idea loaded.");
      })
  }

  IsUserPublisher(userId): boolean {
    let res = this.authService.GetUserId;
    return res == userId;
  }

  get IfThereIsUser() {
    return this.authService.isLoggedIn;
  }

  get f(){
    return this.commentform.controls;
  }
  deleteIdea() {
    this.dataService.removeIdeaById(this.route.snapshot.params.id);
  }

  likeIdea(idea: Idea) {
    this.dataService.likeIdea(this.route.snapshot.params.id, idea);
  }
  commentIdea(idea: Idea) {
    this.dataService.commentIdea(this.route.snapshot.params.id, this.commentform.controls.newComment.value)
    this.commentform.reset();
  }
}
