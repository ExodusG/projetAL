import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssociationService} from "../../../services/association.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {
  AssociationUserSelectDialogComponent
} from "../association-user-select-dialog/association-user-select-dialog.component";
import {IUser} from "../../../../assets/IUser";
import {ToastrService} from "ngx-toastr";


export interface IAssociationDialogData {
  users: IUser[];
}
@Component({
  selector: 'app-association-item',
  templateUrl: './association-item.component.html',
  styleUrls: ['./association-item.component.scss']
})
export class AssociationItemComponent implements OnInit {

  dialogData: IAssociationDialogData = {
    users: []
  };
  assoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    users: new FormControl(this.dialogData.users, []),
    id: new FormControl('', [Validators.required]),
  });
  constructor(private route: ActivatedRoute,
              private userService:UserService,
              private service:AssociationService,
              private router : Router,
              private toastr: ToastrService,
              private dialog: MatDialog){}

  ngOnInit(): void {

    this.route.url.subscribe(res => {

      this.service.getAssociationById(+res[0].path).then(asso=>{
        this.assoForm.controls['name'].setValue(asso.name);
        this.assoForm.controls['id'].setValue(asso.id);
        this.dialogData.users = asso.users ?? [];
      });
    });
  }
  async save(): Promise<void> {
    this.toastr.info('Saving...');
    const name:string=this.assoForm.get('name')?.value;
    const id:number=this.assoForm.get('id')?.value;
    const users: IUser[] = this.assoForm.get('users')?.value;
    //console.log(users);
    await this.service.updateAssociation(id,{name:name,idUsers:users.map(user=>user.id)});
    this.toastr.success('Saved !');
    this.router.navigateByUrl('/associations');
  }
  async back():Promise<void>{
    await this.router.navigateByUrl('/associations');
  }

  async event():Promise<void>{
    const id:number=this.assoForm.get('id')?.value;
    this.toastr.success('Event notify !');
    this.service.postEvent(+id);
    await this.router.navigateByUrl('/associations')
  }
  async remove():Promise<void>{
    this.toastr.info('Removing...');
    const id:number=this.assoForm.get('id')?.value;
    await this.service.deleteAssociation(+id);
    await this.router.navigateByUrl('/associations')
    this.toastr.success('Removed !');
    this.router.navigateByUrl('/associations');
  }

  openUserSelecterDialog() {
    this.dialog.open(AssociationUserSelectDialogComponent, {
      data: this.dialogData
    });
  }

}
