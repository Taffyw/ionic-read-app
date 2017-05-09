import {Injectable} from '@angular/core';
//引入http服务模块 网上找的 拿来用就行
import {HttpService} from '../../providers/HttpService';
// 引入公用的参数
import {APP_SERVE_URL} from '../../providers/Constants';

@Injectable()
export class DetailSevrice {

  constructor(private httpService: HttpService) {
  }
  // 获取书籍内容api
  getDetail(id){
    return this.httpService.postBody(APP_SERVE_URL+'/user/content',{b_id:id});
  }
  //传入bookid跟章节id获取内容
  getTitle(bid,cid){
    return this.httpService.postBody(APP_SERVE_URL+'/user/chapter',{b_id:bid,c_id:cid});
  }
  //添加收藏
  addBook(name,uid,bid){
    return this.httpService.postBody(APP_SERVE_URL+'/user/addItem',{name:name,id:uid,b_id:bid});
  }
  //添加评论
  addcomment(b_id,uname,content){
    return this.httpService.postBody(APP_SERVE_URL+'/user/comment',{b_id:b_id,uname:uname,content:content});
  }
  //获取评论列表
  getCommentList(b_id){
    return this.httpService.postBody(APP_SERVE_URL+'/user/commentlist',{b_id:b_id});
  }
  //用户修改资料
  setData(uname,pass,phone,email){
    var uid = localStorage.getItem('uid');
    return this.httpService.postBody(APP_SERVE_URL+'/user/setdata',{uname:uname,password:pass,phone:phone,email:email,uid:uid});
  }
}
