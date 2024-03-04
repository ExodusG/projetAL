import {Injectable} from "@angular/core";
import {ApiHelperService} from "./api-helper.service";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";
import {IAssociation} from "../../assets/IAssociation";
import {IUser} from "../../assets/IUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private api: ApiHelperService,
                private tokenStorage: TokenStorageService,
                private router: Router) { }

    getUsers(): Promise<IUser[]> {
        return this.api.get({endpoint: '/users'}).catch(error => {
          if (error === 'Unauthorized') {
            this.tokenStorage.clear();
            this.router.navigateByUrl('/auth/login');
          }

        });
    }

    getUserById(id: number): Promise<IUser> {
        return this.api.get({endpoint: '/users/' + id});
    }

    updateUser(id: number, user: IUser) {
        return this.api.put({endpoint: '/users/' + id, data: user});
    }

    deleteUser(id: number): Promise<void> {
        return this.api.delete({endpoint: '/users/' + id});
    }

    createUser(user: IUserCreateInput) {
        return this.api.post({endpoint: '/users', data: user});
    }

    getAssociation(id:number): Promise<IAssociation[]>{
      return this.api.get({endpoint:'/users/'+id+'/associations'});
    }
}

export interface IUserCreateInput {
  firstname: string;
  lastname: string;
  age: number;
  password: string;

}
