import { Component } from '@angular/core';
import { NavController,ModalController,ViewController,ToastController } from 'ionic-angular';
import {RegPage} from '../reg/reg'
import {LoginSevrice} from './LoginSevrice'

/**
 * Generated class for the Demo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname:any;
  pass:any;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public loginStore: LoginSevrice
  ) {
    this.uname = '';
    this.pass = '';
  }
  // 关闭登录页
  dismiss() {
    this.viewCtrl.dismiss('未登录');
  }
  // 去注册页面
  goReg(){
    this.navCtrl.push(RegPage, {
      // item: this.item
    });
  }
  // 点击登录事件
  login(){
    // 表单验证
    if(this.uname ==''){
      let toast = this.toastCtrl.create({
        message: '请输入用户名',
        duration: 2000
      });
      toast.present();
    }else if(this.pass ==''){
      let toast = this.toastCtrl.create({
        message: '请输入密码',
        duration: 2000
      });
      toast.present();
    }else {
      this.loginStore.postLogin(this.uname,this.pass).then(res=>{
        console.log(res);
        var data = JSON.parse(res._body);
        if(data.result ==1){
          // 登录结果成功讲返回的用户信息储存到本地
          localStorage.login = "true";
          localStorage.uname = this.uname;
          localStorage.uid = data.data.details.id;
          localStorage.pass = data.data.details.password;
          localStorage.phone = data.data.details.phone_number;
          localStorage.email = data.data.details.email;
          // 关闭登录页弹出层讲数据带回去
          this.viewCtrl.dismiss(data);
        }
        let toast = this.toastCtrl.create({
          message: data.message,
          duration: 2000
        });
        toast.present();

      })


    }
  }

}
