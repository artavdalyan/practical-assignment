import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { groupBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IPost, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];

  constructor(private http: HttpClient) {}

  injectPosts(posts: IPost[]): void {
    const postsByUserId: { [key: string]: IPost[] } = groupBy(posts, post => post.userId);

    this.users = this.users.map(user => ({
      ...user,
      posts: postsByUserId[user.id],
    }));
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('assets/users.json').pipe(tap(users => (this.users = users)));
  }

  getUser(id: string): IUser | undefined {
    return this.users.find(user => user.id === id);
  }
}
