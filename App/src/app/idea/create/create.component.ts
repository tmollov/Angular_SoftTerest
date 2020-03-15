import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
  imageUrlPattern = 'https*:\/\/.*';

  loading = false;
  constructor(private dataService: DataService,
    private router: Router,
    private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageURL: ['', [Validators.required, Validators.pattern(this.imageUrlPattern)]]
    });
  }

  get f() {
    return this.createForm.controls;
  }

  showErrors() {
    console.log(this.createForm.controls.imageURL.errors);

  }

  get https(): boolean {
    return this.createForm.controls.imageURL.errors.pattern.actualValue.startsWith('https://');
  }

  get http(): boolean {
    return this.createForm.controls.imageURL.errors.pattern.actualValue.startsWith('http://');
  }

  onSubmit() {
    this.loading = true;

    this.dataService
      .addIdea(this.f.title.value,
        this.f.description.value,
        this.f.imageURL.value)
      .then((data) => {
        console.log(data);
        this.createForm.reset();
        this.loading = false;

        this.notificationMessage = "Your idea was successfully added!"
        setTimeout(() => {
          this.notificationMessage = null;
        }, 3000);
      });
  }
}
