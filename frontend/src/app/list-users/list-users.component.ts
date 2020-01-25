import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../models/users.model';
import {PageEvent} from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { InformationPopup } from '../popups/information.popup';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  isLoading = false;
  
  constructor(
    private _api: ApiService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.countUsers()
    this._api.getUsers(0)
    .subscribe(res => {
      this.usersData = res;
      console.log(this.usersData);
      this.isLoading = false;
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
    return event
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
      this.atualizaLista();
    }
  }
  deleteUser(userId){
    console.log(userId)
    const dialogRef = this.dialog.open(InformationPopup, {
      data: {id: userId}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this._api.deleteUser(userId).subscribe(res=>{
          this._snackBar.open("Usuário excluído com sucesso!", "Excluir", {
            duration: 2000,
          });
          this.atualizaLista();
        }, (err)=>{
          console.log(err);
        })
      }
    })
  }
  countUsers(){
    this.isLoading = true;
    this._api.countUsers()
    .subscribe(res => {
      console.log(res);
      this.totalUsers = res;
    })
  }
  atualizaLista(){
    this.countUsers()
    this.isLoading = true;
    var skip = 0;
    skip = 10 * this.page;
    this._api.getUsers(skip)
    .subscribe(res => {
      this.usersData = res;
      this.isLoading = false;
      console.log(this.usersData);
    }, err => {
      console.log(err);
    })
  }
}
