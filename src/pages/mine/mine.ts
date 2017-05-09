import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { LoginPage } from './login'
import {DataPage} from './data'
import {DEFAULT_AVATAR} from '../../providers/Constants'

/**
 * Generated class for the Demo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {
  face:any;
  uname:any;
  text:any;
  phone:any;
  email:any;
  flag:any;
  def_face:String = DEFAULT_AVATAR;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController) {
    // this.init();
  }
  ionViewDidEnter(){
    //每次进来都要初始化更新资料 判断是否登录
    this.init();
  }
  //初始化
  init(){
    if(localStorage.getItem('login') == 'true'){
      // 如果登录了显示用户信息 改变按钮
      this.flag = true;
      this.face = '../../assets/1.jpg';
      this.uname = localStorage.getItem('uname');
      this.phone = localStorage.getItem('phone');
      this.email = localStorage.getItem('email');
      this.text = '注销'
    }else {
      // 没有登录调退出方法 默认弹出登录页面
      this.logout();
    }
  }
  setData(){
    // 点击资料跳转设置资料页面 带上数据
    this.navCtrl.push(DataPage, {
      uname:localStorage.getItem('uname'),
      phone:localStorage.getItem('phone'),
      email:localStorage.getItem('email'),
      pass:localStorage.getItem('pass'),
    });
  }
  // log(){
  //   this.flag=false;
  //   this.text = '立即登录';
  //   let modal = this.modalCtrl.create(LoginPage);
  //   modal.onDidDismiss(data => {
  //     if(data=='未登录'){
  //       this.text = '立即登录';
  //     }
  //     this.uname = data;
  //     this.phone = localStorage.getItem('phone');
  //     this.email = localStorage.getItem('email');
  //   });
  //   modal.present();
  // }
  // 退出登录事件
  logout(){
    localStorage.login = "";
    localStorage.uname = "";
    localStorage.phone = "";
    localStorage.email = "";
    localStorage.pass = "";
    let modal = this.modalCtrl.create(LoginPage);
    // 登录页关闭时候的回调
    modal.onDidDismiss(data => {
      if(data !='未登录'){
        // 如果登录就初始化个人信息
        this.uname = data.data.details.user_name;
        this.flag = true;
        this.text = '注销';
        this.phone = localStorage.getItem('phone');
        this.email = localStorage.getItem('email');
      }else {
        // 没有登录不显示信息 显示未登录跟登录按钮
        this.uname = data;
        this.flag=false;
        this.text = '立即登录';
      }
    });
    modal.present();
  }
  openModal() {

  }
}
