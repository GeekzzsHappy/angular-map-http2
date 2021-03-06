import { Component, OnInit, Output, Input } from '@angular/core';
import { Utility, ServiceHelper, routeAnimation, BaseComponent } from '../Core';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'xtn-manage-register',
  templateUrl: './register.html',
  animations: [routeAnimation],
  styleUrls: ['./register.scss'],
  providers: [ServiceHelper]
})
export class Register extends BaseComponent implements OnInit {
  public UserInfo: any;
  constructor(private sHelper: ServiceHelper, private sanitizer: DomSanitizer) {
    super();
    this.UserInfo = { UserName: 1, Password: 1, ConfromPassword: 1, Tel: '12142141', Address: 'address' };
  }

  ngOnInit() {
  }

  __ClickRegister() {
    const data = Object.assign({}, this.UserInfo);
    data.Password = CryptoJS.MD5(this.UserInfo.Password).toString();
    const __self = this;
    this.sHelper.UserInfo.AddUser(data).then(() => {
    });
  }

  HeadPortrait: any;
  onChangeHeadPortrait(event, field) {
    const file = event.currentTarget.files[0];
    this.UserInfo[field] = file;
    this.HeadPortrait = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }

  onChangeFileList(event, field) {
    if (!this.UserInfo.FileList) {
      this.UserInfo.FileList = [];
    }
    const file = event.currentTarget.files[0];
    this.UserInfo.FileList.push(file);
  }

  btnDeleteSelectDelete(index) {
    this.UserInfo.FileList.splice(index, 1);
  }
  btnSubmit() {
    const data = Object.assign({}, this.UserInfo);
    data.Password = CryptoJS.MD5(this.UserInfo.Password).toString();
    const __self = this;
    this.sHelper.UserInfo.Register(data).then(() => {
    });
  }
}
