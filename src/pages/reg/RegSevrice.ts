import {Injectable} from '@angular/core';
import {HttpService} from '../../providers/HttpService';
import {APP_SERVE_URL} from '../../providers/Constants';

@Injectable()
export class RegSevrice {

  constructor(private httpService: HttpService) {
  }
  // 注册api
  postReg(name,pass,phone,email){
    return this.httpService.postBody(APP_SERVE_URL+'/user',{
      name:name,
      password:pass,
      phone_number:phone,
      email:email,
    });
  }


}
