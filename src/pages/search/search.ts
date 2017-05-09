import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import {HomeSevrice} from '../home/HomeSevrice'
import {BookDetail} from '../book-detail/book-detail'

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  shouldShowCancel:Boolean;
  myInput:String;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public home:HomeSevrice,
              public toastCtrl: ToastController,
  ) {
    this.shouldShowCancel = true;
    this.myInput =''
  }
  onInput(e){
    // console.log(this.myInput);
  }
  // 确认搜索事件
  onCancel(){
    var that = this;
    this.home.searchBook(this.myInput).then(res=>{
      if(res._body == "[]"){
        let toast = this.toastCtrl.create({
          message: '暂未找到相关书籍',
          duration: 2000
        });
        toast.present();
      }else {
        var data = JSON.parse(res._body);
        that.navCtrl.push(BookDetail, {
          item: data[0]
        });
      }
    })
    // this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Search');
  }

}
