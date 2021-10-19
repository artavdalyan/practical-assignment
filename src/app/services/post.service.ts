import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IPost } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: IPost[] = [];

  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('assets/posts.json').pipe(tap(posts => (this.posts = posts)));
  }
}
