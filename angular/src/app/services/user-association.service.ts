import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {AssociationService} from "./association.service";

@Injectable({
  providedIn: 'root'
})
export class UserAssociationService {
  constructor(private userService: UserService,
              private associationService: AssociationService) {
  }

  async getUserAssociations(): Promise<any> {
    // TODO: implement this method
  }
}
