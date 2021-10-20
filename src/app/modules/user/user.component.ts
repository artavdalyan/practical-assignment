import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { IUser } from "../../interfaces";
import { CsvService } from "../../services/csv.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: IUser | undefined;

  constructor(
    private userService: UserService,
    private csvService: CsvService,
    private activateRoute: ActivatedRoute,
    ) {
     const userId = this.activateRoute.snapshot.params['id'];
     if(userId) {
       this.user = this.userService.getUser(userId)
     }
      debugger;
  }

  exportAsImage() {
    if(this.user){
      this.csvService.domToCanvas(document.getElementById('table')!.innerHTML)
    }
  }

  exportAsCsv() {
    if(this.user){
      this.csvService.exportAsCvs(`${this.user.name} posts`,
        this.user.posts.map(({title, body: message})=> ({title, message})));
    }
  }
}
