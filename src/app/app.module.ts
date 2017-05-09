import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//每添加一个页面/组件需要在住app模块引入并在下面注册
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MinePage } from '../pages/mine/mine';
import { CommentPage } from '../pages/book-detail/comment';
import { BookDetail } from '../pages/book-detail/book-detail';
import { SearchPage } from '../pages/search/search';
import { Read } from '../pages/read/read';
import { PopoverPage } from '../pages/read/read.pop';
import { LoginPage } from '../pages/mine/login';
import { RegPage } from '../pages/reg/reg';
import { DataPage } from '../pages/mine/data';
import {GlobalData} from '../providers/GlobalData'
import {HomeSevrice} from '../pages/home/HomeSevrice'
import {RegSevrice} from '../pages/reg/RegSevrice'
import {LoginSevrice} from '../pages/mine/LoginSevrice'
import {DetailSevrice} from '../pages/book-detail/DetailSevrice'
import {HttpService} from '../providers/HttpService'
import { StatusBar } from '@ionic-native/status-bar';
import {JsonpModule,HttpModule} from '@angular/http'
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  //注册模块
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MinePage,
    BookDetail,
    SearchPage,
    Read,
    PopoverPage,
    LoginPage,
    RegPage,
    CommentPage,
    DataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',         //隐藏全部子页面底部tabs
      backButtonText:'返回'               //设置子页面返回的按钮文字
    }),
    JsonpModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MinePage,
    BookDetail,
    SearchPage,
    Read,
    PopoverPage,
    LoginPage,
    RegPage,
    CommentPage,
    DataPage
  ],
  providers: [
    //注入提供的服务
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalData,//全局变量
    HomeSevrice,//首页的服务
    HttpService,//http服务
    RegSevrice,//注册服务
    LoginSevrice,//登录服务
    DetailSevrice//详情页面的服务
  ]
})
export class AppModule {}
