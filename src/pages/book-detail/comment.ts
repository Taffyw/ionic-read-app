import { Component } from '@angular/core';
import { NavController,ModalController,ViewController,ToastController,NavParams } from 'ionic-angular';
import {DetailSevrice} from './DetailSevrice'

/**
 * Generated class for the Demo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment:any;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public detail: DetailSevrice,
              public params: NavParams
  ) {
    this.comment = '';
  }
  // 取消评价
  dismiss() {
    this.viewCtrl.dismiss('取消评价');
  }
  // 立即评价
  goComment(){
      var bid = this.params.get('b_id');
      var uname = localStorage.getItem('uname');
      this.detail.addcomment(bid,uname,this.comment).then(res=>{
        let toast = this.toastCtrl.create({
          message: '评价成功',
          duration: 2000
        });
        toast.present();
        this.viewCtrl.dismiss('评价成功');
      })
    }

}
