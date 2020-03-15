import { Injectable } from '@angular/core';
import { DataStoreService, Query, DataStoreType } from 'kinvey-angular-sdk';
import { Idea } from '../models/Idea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  collection: any;
  collLen = 0;
  constructor(private dataStoreService: DataStoreService) {
    this.collection = this.dataStoreService.collection('ideas', DataStoreType.Network);
  }

  async addIdea(title: string, description: string, imageUrl: string) {
    try {
      let idea: Idea = {
        title: title,
        description: description,
        imageURL: imageUrl
      }
      debugger
      const savedIdea = await this.collection.save(idea);
      console.log(savedIdea);
    } catch (error) {
      console.log(error);
    }
  }

  find$(): Observable<Idea> {
    return this.collection.find()
      .pipe(map((data: []) => {
        return data;
      }));
  }

  findById$(id): Observable<Idea> {
    return this.collection.findById(id)
      .pipe(map((data:Idea) => {
        console.log(data);
        
        return data;
      }));
  }
}
