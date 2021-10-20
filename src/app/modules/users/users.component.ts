import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IUser } from '../../interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  users: IUser[];

  constructor(private userService: UserService) {
    this.users = this.userService.users;
  }
}
