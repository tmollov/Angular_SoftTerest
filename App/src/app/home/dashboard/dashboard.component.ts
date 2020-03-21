import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs';
import { Idea } from 'src/app/shared/models/Idea';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public entites: Observable<Idea>;
  isEntitiesLoaded: boolean = false;
  notificationMessage = "Dashboard is loading..."
  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.entites = this.dataService.getIdeas$()
    .pipe(finalize(()=>{
      this.isEntitiesLoaded = true;
    }));
  }

  showData() {

  }
}
