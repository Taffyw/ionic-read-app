import { Component } from '@angular/core';
import { NavParams , ViewController } from 'ionic-angular';

@Component({
  selector: 'pop-page',
  templateUrl:'pop.html'
})
export class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;
  font:any;
  list:any;
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

  constructor(private navParams: NavParams,public viewCtrl: ViewController,) {
  }

  ngOnInit() {
    console.log('navParams',this.navParams.data);
    if (this.navParams.data) {
      // 从阅读组件获取的dom组件跟数据
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;
      this.font = localStorage.getItem('font');
      this.textEle.style.fontSize = this.font +'px';
      this.background = localStorage.getItem('bg') || 'white';
      this.setFontFamily();
      this.list = this.navParams.data.list
    }
  }
  // 选择了章节关闭浮层加载对应章节
  changeTitle(id){
    this.viewCtrl.dismiss(id);
  }
  getColorName(background) {
    let colorName = 'white';
    if (!background) return 'white';
    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = localStorage.getItem('bg');
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }
// 改变背景事件
  changeBackground(color) {
    localStorage.setItem('bg',color);
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }
  // 改变字体事件
  changeFontSize(direction) {
    console.log(direction);
    if(direction=='large'){
      this.font == 24?'':this.font++;
    }else if(direction =='small'){
      this.font == 10?'':this.font--;
    }
    this.textEle.style.fontSize = this.font +'px';
    localStorage.setItem('font',this.font);
  }

  changeFontFamily() {
    // if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }
}

