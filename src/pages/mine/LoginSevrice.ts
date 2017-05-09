import {Injectable} from '@angular/core';
import {HttpService} from '../../providers/HttpService';
import {APP_SERVE_URL} from '../../providers/Constants';

@Injectable()
export class LoginSevrice {

  constructor(private httpService: HttpService) {
  }
  // 登录api
  postLogin(name,pass){
    return this.httpService.post(APP_SERVE_URL+'/user/login',{
      name:name,
      password:pass
    });
  }


}
