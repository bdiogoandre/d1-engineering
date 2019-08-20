import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/users.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  usersData: User[];
  totalUsers: Number;
  pageEvent: PageEvent;
  page = 0;
  constructor(private _api: ApiService) { }

  ngOnInit() {
    this._api.countUsers()
    .subscribe(res => {
      console.log(res);
      this.totalUsers = res;
    })
    this._api.getUsers(0)
    .subscribe(res => {
      this.usersData = res;
      console.log(this.usersData);
    }, err => {
      console.log(err);
    })
  }
  getPageEvent(event){
    console.log(event);
    var skip = 0;
    this.page = event.pageIndex;
    skip = 10 * this.page;
    this._api.getUsers(skip)
    .subscribe(res => {
      this.usersData = res;
      console.log(this.usersData);
    }, err => {
      console.log(err);
    })
  }
  searchUser(ev){
    console.log(ev.target.value);
    var fullname = ev.target.value;
    if(fullname != ""){
      this._api.getUserByName(fullname)
      .subscribe(res => {
        this.usersData = res;
      }, err=>{
        console.log(err);
      })
    }else{
      var skip = 0;
      skip = 10 * this.page;
      this._api.getUsers(skip)
      .subscribe(res => {
        this.usersData = res;
        console.log(this.usersData);
      }, err => {
        console.log(err);
      })
    }
  }
}
