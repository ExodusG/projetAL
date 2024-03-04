import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {IUser} from "../../../../assets/IUser";
import {UserItemComponent} from "../user-item/user-item.component";

@Component({
  selector: 'app-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.scss']
})
export class UserItemPageComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              private service: UserService) { }

  user?: IUser;
  @ViewChild(UserItemComponent) itemComp! : UserItemComponent;

  ngOnInit(): void {
    this.router.url.subscribe(async url => {
      const id = +url[0].path;
      this.user = await this.service.getUserById(id);
      console.log("User is");
      console.log(this.user);
    })
  }

}
