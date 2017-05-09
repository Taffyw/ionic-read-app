import {Injectable} from '@angular/core';
import {HttpService} from '../../providers/HttpService';
import {APP_SERVE_URL} from '../../providers/Constants';

@Injectable()
export class HomeSevrice {

  constructor(private httpService: HttpService) {
  }
  // 获取书籍列表api
  getList(){
    return this.httpService.postBody(APP_SERVE_URL+'/user/allbook',null);
  }
  // 获取用户书架的书籍列表
  getFav(uid){
    return this.httpService.postBody(APP_SERVE_URL+'/user/getfav',{uid:uid});
  }
  // 搜索书籍
  searchBook(b_name){
    return this.httpService.postBody(APP_SERVE_URL+'/user/search',{b_name:b_name});
  }
  // 删除书架书籍
  deleteBookBy(b_id){
    return this.httpService.postBody(APP_SERVE_URL+'/user/deleteItem',{b_id:b_id});
  }
}
