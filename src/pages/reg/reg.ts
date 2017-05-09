import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import {RegSevrice} from './RegSevrice'

/**
 * Generated class for the Demo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  uname:any;
  pass:any;
  repass:any;
  phone:any;
  email:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public reg :RegSevrice) {
    this.uname='';
    this.pass='';
    this.repass='';
    this.phone='';
    this.email='';
  }
  // 去注册
  goReg(){
    // 表单验证
    if(this.uname ==''){
      let toast = this.toastCtrl.create({
        message: '请输入用户名',
        duration: 2000
      });
      toast.present();
    }else if(this.phone.length!=11){
      let toast = this.toastCtrl.create({
        message: '请输入正确的手机号',
        duration: 2000
      });
      toast.present();
    }else if(this.email==''){
      let toast = this.toastCtrl.create({
        message: '请输入邮箱',
        duration: 2000
      });
      toast.present();
    }else if(this.pass !=this.repass){
      let toast = this.toastCtrl.create({
        message: '两次密码不一致密码',
        duration: 2000
      });
      toast.present();
    }else {
      // 注册成功返回到登录页
      this.reg.postReg(this.uname,this.pass,this.phone,this.email).then(res=>{
        let toast = this.toastCtrl.create({
          message: res._body,
          duration: 2000
        });
        toast.present();
        this.navCtrl.pop();
      })
    }
  }
  // 去登录事件
  goLogin(){
    this.navCtrl.pop();
  }
}
