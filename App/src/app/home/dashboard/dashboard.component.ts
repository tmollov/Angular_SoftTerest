import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Idea } from 'src/app/models/Idea';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public entites: Observable<Idea>;
  notificationMessage = "Dashboard is loading..."
  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.entites = this.dataService.find$();
    }, 1000);
    
  }

  showData() {

  }
}
