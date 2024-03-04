import { Component, OnInit } from '@angular/core';
import {ApiHelperService} from "../../../services/api-helper.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService,
              private router : Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const userForm = this.loginForm.get('user');
    const passwordForm = this.loginForm.get('pass');
    const username: string = userForm?.value;
    const password: string = passwordForm?.value;
    // console.log(username, password);
    const isLogged = await this.auth.login(username, password);
    if (isLogged) {
      await this.router.navigateByUrl('/users');
    } else {
      userForm?.setErrors({wrongPassword: true});
      passwordForm?.setErrors({wrongPassword: true});
      this.toastr.error('Utilisateur ou mot de passe invalide', 'Erreur');
    }
  }

}
