import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private service:UserService,private router : Router) { }

  ngOnInit(): void {

  }
  async onFormSubmit():Promise<void>{
    const firstname:string=this.userForm.get('firstname')?.value;
    const lastname:string=this.userForm.get('lastname')?.value;
    const age:string=this.userForm.get('age')?.value;
    const password:string=this.userForm.get('password')?.value;
    await this.service.createUser({firstname:firstname,lastname:lastname,age:+age,password:password});
    await this.router.navigateByUrl('/users');
  }
}
