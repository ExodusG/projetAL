import {Injectable} from "@angular/core";
import {ApiHelperService} from "./api-helper.service";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiHelperService,
              private tokenStorageService: TokenStorageService) {
  }

  async login(username: string, password: string): Promise<boolean> {
    return this.api.post({endpoint: '/auth/login', data: {username, password}})
      .then((response) => {
      if (response.access_token) {
        this.tokenStorageService.save(response.access_token);
        return true;
      }
      return false;
    }).catch((error) => {
      console.log(error);
      return false;
    });

  }

}
