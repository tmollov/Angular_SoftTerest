import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Idea } from '../../shared/models/Idea';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  ngOnInit() {
  }

  createForm: FormGroup;
  notificationMessage = "";

  loading = false;
  constructor(private dataService: DataService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageURL: ['', Validators.required,]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  showErrors() {
    console.log(this.createForm.controls.imageURL.errors);

  }

  onSubmit() {
    this.loading = true;

    this.dataService
      .addIdea(this.f.title.value,
        this.f.description.value,
        this.f.imageURL.value)
      .then((data) => {
        this.createForm.reset();
        this.loading = false;
        this.router.navigate([`idea/detail/${data._id}`]);
        
      }).catch((err)=>{
        this.notificationMessage = "Something went from when adding your idea!"
        setTimeout(() => {
          this.notificationMessage = null;
        }, 3000);
      });
  }
}
