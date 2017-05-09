import { Component } from '@angular/core';
// 两个tab根组件
import { HomePage } from '../home/home';
import { MinePage } from '../mine/mine';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MinePage;

  constructor() {

  }
}
