import {IAssociation} from "./IAssociation";

export interface IUser{
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  password: string;
  associations?: IAssociation[];

}
