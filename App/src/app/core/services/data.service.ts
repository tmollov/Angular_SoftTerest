import { Injectable } from '@angular/core';
import { DataStoreService, Query, DataStoreType } from 'kinvey-angular-sdk';
import { Idea } from '../../shared/models/Idea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Like } from '../../shared/models/Like';
import { Comment } from '../../shared/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  IdeaCollection: any;
  LikesCollection: any;
  collLen = 0;
  constructor(private dataStoreService: DataStoreService) {
    this.IdeaCollection = this.dataStoreService.collection('ideas', DataStoreType.Network);
    this.LikesCollection = this.dataStoreService.collection('likes',DataStoreType.Network);
  }

  getUserIdeas$(creatorId:string) : Observable<any>{
    const query = new Query();
    query.equalTo('_acl.creator', creatorId);
    return this.IdeaCollection.find(query)
    .pipe(map((data: []) => {
      return data;
    }));
  }

  async addIdea(title: string, description: string, imageUrl: string) {
    try {
      let idea: Idea = {
        title: title,
        description: description,
        imageURL: imageUrl,
        likes: 0,
        comments: []
      }
      debugger
      const savedIdea = await this.IdeaCollection.save(idea);
      return savedIdea
    } catch (error) {
      console.log(error);
    }
  }

  getIdeas$(): Observable<Idea> {
    return this.IdeaCollection.find()
      .pipe(map((data: []) => {
        return data;
      }));
  }

  getIdeaById$(id:string): Observable<Idea> {
    return this.IdeaCollection.findById(id)
      .pipe(map((data:Idea) => {
        return data;
      }));
  }

  async removeIdeaById(id: string) {
    try {
      const result = await this.IdeaCollection.removeById(id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  // In description: "Users can Like ideas multiple times.". Don't Judge Me.
  // TODO: users CANT like ideas multiple times.
  async likeIdea(idea:Idea, userId: string){
    try {
      let like: Like = {
        UserId: userId,
        IdeaId: idea._id
      }
      idea.likes += 1; 
      
      const savedIdea = await this.IdeaCollection.save(idea);
      const savedLike = await this.LikesCollection.save(like);
      
    } catch (error) {
      console.log(error);
    }
  }

  async commentIdea(Idea:Idea, username: string,content: string){
    try {
      let comment: Comment = {
        Username: username,
        Content: content
      }
      Idea.comments.push(comment);
      
      const savedIdea = await this.IdeaCollection.save(Idea);
      
    } catch (error) {
      console.log(error);
    }
  }
}
