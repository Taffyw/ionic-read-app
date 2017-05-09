//引入模块所需要的组件 ionic提供的组件 要使用都要引入然后定义初始化
import { Component } from '@angular/core';
//angular模块
import { NavController, NavParams,ToastController,ModalController } from 'ionic-angular';
//导航控制器，导航参数，提醒控制器，弹出层控制器
import {Read} from '../read/read'
//点击阅读的读书组件
import {CommentPage} from './comment'
//评价弹出页面组件
import {DetailSevrice} from './DetailSevrice'
//详情页服务 ajax异步请求的数据都在里面封装
/**
 * 书籍详情页面
 */
@Component({
  selector: 'page-book-detail',//scss样式选择器
  templateUrl: 'book-detail.html',//模板文件 每个页面同理
})
export class BookDetail {//模块/类名
  // 定义模块需要的数据以及类型any不限制
  item:any;//书籍信息
  commentList:any;//评价列表
  flag:any;//是否存在评论标识
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public book :DetailSevrice,
              public modalCtrl: ModalController
              // 初始化参数 页面中使用this.使用
  ) {
    this.item = navParams.get('item') //从nav组件获取父级向子级传递的数据
    this.initComment(this.item.id);//初始化评论列表
    this.flag = false;//默认
  }
  //立即阅读事件
  openRead(event,id){
    this.book.getDetail(id).then(res=>{
      var data = JSON.parse(res._body);
      console.log(data);
      if(data.list.length==0){
        let toast = this.toastCtrl.create({
          message: '暂无内容，尽情期待',
          duration: 2000
        });
        toast.present();
      }else {
        //跳转到阅读页面，带上数据
        this.navCtrl.push(Read, {
          content:data.content[0].content,
          list:data.list,
          b_id:id
        });
      }
    })

  }
  //添加收藏
  addItem(e,item){
    let uid = localStorage.getItem('uid');
    if(uid){
      this.book.addBook(item.name,uid,item.id).then(res=>{
        let toast = this.toastCtrl.create({
          message: res._body,
          duration: 2000
        });
        toast.present();
      })
    }
    console.log(item);
  }
  openComment(e,id){
    var that = this;
    let modal = this.modalCtrl.create(CommentPage,{b_id:id});
    //打开评论弹出层，带上书籍id参数
    modal.onDidDismiss(data => {
      that.initComment(that.item.id);
    });
    modal.present();
  }
  // 初始化评论
  initComment(id){
    var that = this;
    this.book.getCommentList(id).then(res=>{
      //json格式化字符串
      var data = JSON.parse(res._body);
      if(data.length ==0){
        // 没有数据就显示暂无评论
        that.flag =true
      }else {
        that.flag =false
      }
      //赋值
      that.commentList = data;
    })
  }
  //页面将要进入触发的事件
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetail');
  }

}
