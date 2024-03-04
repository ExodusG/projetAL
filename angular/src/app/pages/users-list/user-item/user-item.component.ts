import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IUser} from "../../../../assets/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {IAssociation} from "../../../../assets/IAssociation";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit, OnChanges {

  constructor(private service: UserService,
              private router: Router,
              private toastr: ToastrService) {
  }


  @Input()
  user! : IUser;

  @Input()
  nom! :  string;

  userForm!: FormGroup;

  ngOnInit(): void {
    console.log("init");
    console.log(this.user);
    this.userForm = new FormGroup({
      firstname: new FormControl(this.user.firstname, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      age: new FormControl(this.user.age, [Validators.required]),
      password: new FormControl("", []),
      id: new FormControl(this.user.id, [Validators.required]),
      associations: new FormArray([]),
    });
    const formAssos = this.userForm.get('associations') as FormArray;
    console.log(this.user.associations);
    this.user.associations?.forEach(asso => {
      formAssos.push(new FormControl(asso.name, []));
    });
  }


  async save(): Promise<void> {
    this.toastr.info("Saving user...");
    const firstname:string=this.userForm.get('firstname')?.value;
    const lastname:string=this.userForm.get('lastname')?.value;
    const age:string=this.userForm.get('age')?.value;
    const password:string= this.userForm.get('password')?.value ?? this.user.password;
    const id:number=this.userForm.get('id')?.value;
    await this.service.updateUser(+id,{id:+id,firstname:firstname,lastname:lastname,age:+age,password:password});
    this.toastr.success("Saved !");
    await this.router.navigateByUrl('/users');
    window.location.reload();
  }

  async back():Promise<void>{

    // await this.router.navigateByUrl('/users');
  }

  async remove():Promise<void>{
    this.toastr.info("Removing user...");
    const id:number=this.userForm.get('id')?.value;
    await this.service.deleteUser(+id);
    this.toastr.success("Removed !");
    await this.router.navigateByUrl('/users');
    window.location.reload();
  }

  getAssociationsControl() : AbstractControl[] {
    return (this.userForm.get('associations') as FormArray).controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

}
