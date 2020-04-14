import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  enities: any[];
  isEntitiesLoaded: boolean = false;
  constructor(private dataService: DataService,
    private toastr:ToastrService) {
      this.toastr.info("Dashboard is loading...")
    this.dataService.getIdeas()
      .then((querySnapshot) => {
        this.enities = querySnapshot.docs;
        this.isEntitiesLoaded = true;
        this.toastr.success("Dashboard loaded!");
      });
  }
  ngOnInit(): void {
  }
}
