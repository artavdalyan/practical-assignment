import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';

export function initApp(userService: UserService, postService: PostService) {
  return async (): Promise<void> => {
    const [, posts] = await Promise.all([userService.getUsers().toPromise(), postService.getPosts().toPromise()]);

    userService.injectPosts(posts);
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [UserService, PostService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
