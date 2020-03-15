import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() successMessage: string;
  @Input() errorMessage: string;
  @Input() loadingMessage: string;

  constructor() { }

  ngOnInit() {
  }

  reset(key) {
    switch (key) {
      case 0:
        this.successMessage = null; break;
      case 1:
        this.errorMessage = null; break;
    }
  }
}
