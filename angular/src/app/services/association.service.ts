import {Injectable} from "@angular/core";
import {ApiHelperService} from "./api-helper.service";
import {IAssociation} from "../../assets/IAssociation";

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

    constructor(private api: ApiHelperService) { }

    getAssociations() {
        return this.api.get({endpoint: '/associations'});
    }

  postEvent(id:number) {
    return this.api.get({endpoint: '/events/'+id});
  }

    getAssociationById(id: number): Promise<IAssociation> {
        return this.api.get({endpoint: '/associations/' + id});
    }

    updateAssociation(id: number, data: IAssociationUpdateParams) {
        return this.api.put({endpoint: '/associations/' + id, data});
    }

    deleteAssociation(id: number) {
        return this.api.delete({endpoint: '/associations/' + id});
    }

    createAssociation(data: IAssociationCreateParams) {
        return this.api.post({endpoint: '/associations', data});
    }

    removeUserFromAssociation(associationId: number, userId: number) {
        return this.api.delete({endpoint: `/associations/${associationId}/users/${userId}`});
    }

    addUserToAssociation(associationId: number, userId: number) {
        return this.api.put({endpoint: `/associations/${associationId}/users/${userId}`});
    }

    getMembers(id: number) {
        return this.api.get({endpoint: `/associations/${id}/members`});
    }
}

export interface IAssociationUpdateParams {
  idUsers: number[];
  name: string;
}

export interface IAssociationCreateParams {
  name: string;
  idUsers: number[];
}
