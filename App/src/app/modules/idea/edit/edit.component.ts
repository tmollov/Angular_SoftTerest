import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  ngOnInit() {

  }

  editLink: string;
  editForm: FormGroup;
  imageUrlPattern = 'https*:\/\/.*';
  idea: any;
  loading = false;
  isIdeaLoaded = false;

  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageURL: ['', [Validators.required, Validators.pattern(this.imageUrlPattern)]]
    });
    this.dataService.getIdeaById(this.route.snapshot.params.id)
      .then((data) => {
        this.idea = data.data();
        this.editLink = "/idea/edit/" + this.route.snapshot.params.id;
        this.editForm.controls.title.setValue(data.data().title);
        this.editForm.controls.description.setValue(data.data().description);
        this.editForm.controls.imageURL.setValue(data.data().imageURL);
        this.isIdeaLoaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get f() {
    return this.editForm.controls;
  }

  get https(): boolean {
    return this.editForm.controls.imageURL.errors.pattern.actualValue.toLowerCase().startsWith('https://');
  }

  get http(): boolean {
    return this.editForm.controls.imageURL.errors.pattern.actualValue.toLowerCase().startsWith('http://');
  }

  onSubmit() {
    this.loading = true;
    
    const obj = {...this.idea, ...{ title: this.f.title.value, description: this.f.description.value,
    imageURL:this.f.imageURL.value}};
console.log(obj);

    this.dataService
  .editIdea(obj, this.route.snapshot.params.id)
  .then((data) => {
    this.router.navigate([`/idea/detail/${this.route.snapshot.params.id}`]);
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
  }
}
