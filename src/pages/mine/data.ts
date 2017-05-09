import { Component } from '@angular/core';
import { NavController,ToastController,ModalController,NavParams } from 'ionic-angular';
import {DetailSevrice} from '../book-detail/DetailSevrice'

@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {
  uname:any;//用户名
  phone:any;//电话
  pass:any;//密码
  email:any;//邮箱
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public detail:DetailSevrice,
              public toastCtrl: ToastController,
  ) {
    // 初始化数据 编辑时候把原来的带出来
    this.uname = navParams.get('uname'); //从nav组件获取父级向子级传递的数据
    this.phone = navParams.get('phone'); //从nav组件获取父级向子级传递的数据
    this.email = navParams.get('email'); //从nav组件获取父级向子级传递的数据
    this.pass = navParams.get('pass'); //从nav组件获取父级向子级传递的数据
  }
  // 设置
  set(){
    this.detail.setData(this.uname,this.pass,this.phone,this.email).then(res=>{
      let toast = this.toastCtrl.create({
        message: res._body,
        duration: 2000
      });
      toast.present();
      // 更新本地储存的用户信息
      localStorage.uname = this.uname;
      localStorage.pass = this.pass;
      localStorage.phone = this.phone;
      localStorage.email = this.email;
      //返回上一个页面
      this.navCtrl.pop();
    })
  }
  ionViewDidEnter(){
  }

}
