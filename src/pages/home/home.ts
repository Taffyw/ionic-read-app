import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { BookDetail } from '../book-detail/book-detail';
import { SearchPage } from '../search/search';
import { HomeSevrice } from './HomeSevrice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //定义页面数据以及类型
  item:Object;//测试
  myList:any;//
  BookList:any;
  FavList:any;
  flag:any;
  constructor(public navCtrl: NavController,
              public homeService: HomeSevrice,
              public toastCtrl: ToastController,
  ) {
    this.flag = false;
    var that =this;
    //初始化书籍列表
    this.homeService.getList().then(res=>{
      that.BookList = JSON.parse(res._body);
    })
  }
  ionViewDidEnter(){
    this.init();
  }
  // 初始化收藏数据
  init(){
    this.homeService.getFav(localStorage.getItem('uid')).then(res=>{
      var data = JSON.parse(res._body);
      if(data.length==0){
        this.flag = true;
      }else {
        this.flag =false
      }
      this.FavList = data;
    })
  }
  //跳转到书籍详情页
  openPage(event,book){
    this.navCtrl.push(BookDetail, {
      item: book
    });
  }
  //从书架的书籍跳转到详情 因为收藏的数据不一样 所以通过bid走搜索接口获取到数据然后传递给详情页
  goFav(e,list){
    var that = this;
    this.homeService.searchBook(list.book_name).then(res=>{
      var data = JSON.parse(res._body);
      that.navCtrl.push(BookDetail, {
        item: data[0]
      });
    })
  }
  // 删除书架的书籍
  deleteBook(item){
    var that = this;
    console.log(item);
    this.homeService.deleteBookBy(item.book_id).then(res=>{
      let toast = this.toastCtrl.create({
        message: res._body,
        duration: 2000
      });
      toast.present();
      that.init();
    })
  }
  // 打开搜索页面
  openSearch(){
    this.navCtrl.push(SearchPage, {
      // item: this.item
    });
  }


}
