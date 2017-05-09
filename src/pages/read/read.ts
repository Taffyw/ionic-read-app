import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams , PopoverController } from 'ionic-angular';
import {PopoverPage} from './read.pop'
import {DetailSevrice} from '../book-detail/DetailSevrice'

@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
})
export class Read {
  // 控制页面dom
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  txt:any;
  list:any;
  b_id:any;
  // 阅读背景颜色数据
  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController,
              public book :DetailSevrice) {
    // 从父组件获取数据并初始化
    this.txt = this.navParams.data.content;
    this.list = this.navParams.data.list;
    this.b_id = this.navParams.data.b_id;
  }
  // 退去阅读事件
  back(){
    this.navCtrl.pop();
  }
  // 浮层菜单事件
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement,
      list:this.list
    });
    // 关闭时候如果带数据就重新获取对应章节
    popover.onDidDismiss(data=>{
      console.log(data);
      if(data){
        var that = this;
        this.book.getTitle(this.b_id,data).then(res=>{
          that.txt = JSON.parse(res._body)[0].content;
          window.scroll(0,0);
        })
      }
    })
    popover.present({
      ev: ev
    });
  }
  // 每次进来从本地数据读取文字大小 背景颜色
  ionViewDidLoad() {
    var color = localStorage.getItem('bg');
    this.content.nativeElement.style.backgroundColor = this.colors[color].bg;
    this.content.nativeElement.style.color = this.colors[color].fg;
    if(localStorage.getItem('font')==null){
      localStorage.setItem('font','14');
    }
    this.text.nativeElement.style.fontSize = localStorage.getItem('font') +'px';
  }

}
