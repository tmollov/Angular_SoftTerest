import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Idea } from '../components/shared/models/Idea';
import { Like } from '../components/shared/models/Like';
import { Comment } from '../components/shared/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  IdeaCollection: any;
  LikesCollection: any;
  CommentsCollection: any;
  collLen = 0;
  constructor(private firestore: AngularFirestore,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.IdeaCollection = firestore.collection<Idea>('idea').ref;
    this.LikesCollection = firestore.collection<Like>('likes').ref;
    this.CommentsCollection = firestore.collection<Comment>('comments').ref;
  }

  get CommentsColl() {
    this.toastr.info("Loading comments...");
    return this.firestore.collection("comments").valueChanges();
  }

  LikesColl(ideaId: string) {
    this.firestore.collection("likes")
      .ref
      .where("IdeaId", "==", ideaId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });
  }

  // TODO: REF
  getUserIdeas$(creatorId: string): Observable<any> {
    return this.IdeaCollection.find(1)
      .pipe(map((data: []) => {
        return data;
      }));
  }

  addIdea(title: string, description: string, imageUrl: string) {
    let idea: Idea = {
      creatorId: this.authService.GetUserId,
      title: title,
      description: description,
      imageURL: imageUrl,
      likes: 0,
      comments: []
    }
    let id = uuidv4();
    return this.IdeaCollection.doc(id).set(idea)
  }
  editIdea(idea: any, ideaId: string) {
    return this.IdeaCollection.doc(ideaId)
      .set(idea);
  }

  addLike(like: Like) {
    let id = uuidv4();
    return this.LikesCollection.doc(id).set(like)
  }

  getIdeas() {
    return this.IdeaCollection.get();
  }

  getIdeaById(id: string) {
    return this.IdeaCollection.doc(id).get();
  }

  //TODO: REF
  removeIdeaById(id: string) {
    this.toastr.warning("Deleting idea...");
    this.IdeaCollection.doc(id).delete()
      .then((data) => {
        this.toastr.success("Idea deleted!");
        this.router.navigate(["dashboard"]);
      });
  }

  // In description: "Users can Like ideas multiple times.". Don't Judge Me.
  // TODO: users CANT like ideas multiple times.
  likeIdea(ideaId: string, idea: Idea) {
    let like: Like = {
      UserId: this.authService.GetUserId,
      IdeaId: uuidv4()
    }
    idea.likes += 1;

    this.editIdea(idea, ideaId)
      .then(() => {
        this.toastr.success("You liked this idea");
        this.addLike(like);
      })
  }

  commentIdea(ideaId: string, content: string) {
    let comment: Comment = {
      IdeaId: ideaId,
      UserId: this.authService.GetUserId,
      Username: this.authService.GetUserUsernameByEmail,
      Content: content,
      Timespan: Date.now()
    }
    let commentId = uuidv4();
    this.toastr.info("Adding comment");
    this.CommentsCollection.doc(commentId)
      .set(comment)
      .then((data) => {
        this.toastr.success("Comment added!");
      })
  }
}
