import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../interfaces';
import { ExportService } from '../../services/export.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  @ViewChild('tableRef', { static: true }) tableRef: ElementRef | undefined;
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef | undefined;

  user: IUser | undefined;

  constructor(private userService: UserService,
              private exportService: ExportService,
              private activateRoute: ActivatedRoute) {
    const userId = this.activateRoute.snapshot.params['id'];

    if (userId) {
      this.user = this.userService.getUser(userId);
    }
  }

  exportAsImage(): void {
    if (this.user) {
      this.exportService.exportAsImage(
        `${this.user.name} posts`,
        this.tableRef?.nativeElement.innerHTML,
        this.canvasRef?.nativeElement
      );
    }
  }

  exportAsCsv(): void {
    if (this.user) {
      this.exportService.exportAsCvs(
        `${this.user.name} posts`,
        this.user.posts.map(({ title, body: message }) => ({ title, message })),
      );
    }
  }
}
