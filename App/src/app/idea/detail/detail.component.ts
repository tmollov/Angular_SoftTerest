import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Idea } from 'src/app/models/Idea';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  commentLikeform : FormGroup;
  ideaDetails$: Observable<Idea>;
  notificationMessage = "Loading idea...";
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder) {
      this.commentLikeform = this.fb.group({
        newComment: ['']
      });
   }

  ngOnInit() {
    setTimeout(() => {
      this.ideaDetails$ = this.dataService.findById$(this.route.snapshot.params.id);
    }, 500);
   
  }

}
