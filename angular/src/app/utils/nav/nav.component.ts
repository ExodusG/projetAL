import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLogged : Boolean =true;
  constructor(private router : Router,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log("click on logout !");
    this.tokenStorageService.clear();
    this.router.navigateByUrl("/auth/login");
  }

}
