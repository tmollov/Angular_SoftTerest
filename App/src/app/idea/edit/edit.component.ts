import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { DataService } from 'src/app/core/services/data.service';
import { Idea } from 'src/app/shared/models/Idea';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  ngOnInit() {
    this.idea$ = this.dataService.getIdeaById$(this.route.snapshot.params.id)
      .pipe(map((data)=>{
        this.isIdeaLoaded = true;
        this.editLink ="/idea/edit/" + this.route.snapshot.params.id;
        this.editForm.controls.title.setValue(data.title);
        this.editForm.controls.description.setValue(data.description);
        this.editForm.controls.imageURL.setValue(data.imageURL);
        return data;
      }));
  }

  isIdeaLoaded: boolean = false;
  notificationMessage = "Loading idea...";
  editLink : string;

  editForm: FormGroup;
  imageUrlPattern = 'https*:\/\/.*';
  idea$:Observable<Idea>;
  loading = false;
  constructor(private dataService: DataService,
    private router: Router,
    private route:ActivatedRoute,
    private fb: FormBuilder) {
      this.editForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(6)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        imageURL: ['', [Validators.required, Validators.pattern(this.imageUrlPattern)]]
      });
  }

  get f() {
    return this.editForm.controls;
  }

  showErrors() {
    console.log(this.editForm.controls.imageURL.errors);
  }
 
  get https(): boolean {
    return this.editForm.controls.imageURL.errors.pattern.actualValue.toLowerCase().startsWith('https://');
  }

  get http(): boolean {
    return this.editForm.controls.imageURL.errors.pattern.actualValue.toLowerCase().startsWith('http://');
  }

  onSubmit() {
    debugger;
    this.loading = true;

    this.dataService
      .addIdea(this.f.title.value,
        this.f.description.value,
        this.f.imageURL.value)
      .then((data) => {
        debugger
        console.log(data);
        this.editForm.reset();
        this.loading = false;
        this.router.navigate([`idea/detail/${data._id}`]);
        
      }).catch((err)=>{
        console.log(err);
        this.notificationMessage = "Something went from when editing your idea!"
        setTimeout(() => {
          this.notificationMessage = null;
        }, 3000);
      });
  }
}
