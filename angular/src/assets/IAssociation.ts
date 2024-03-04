import {IUser} from "./IUser";

export interface IAssociation {
  id: number;
  name: string;
  users?: IUser[];
}
