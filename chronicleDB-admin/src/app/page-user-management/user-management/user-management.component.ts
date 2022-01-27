import { EditUserComponent } from './../edit-user/edit-user/edit-user.component';
import { AddUserComponent } from './../add-user/add-user/add-user.component';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from './../../services/auth.service';
import { ChronicleService } from './../../services/chronicle.service';
import { User } from './../../model/User';
import { AuthService } from 'src/app/services/auth.service';
import {AfterViewInit, Component,Inject, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import{MatSort} from '@angular/material/sort';
import {MatPaginator}from "@angular/material/paginator"
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent  {
  displayedColumns = ['username','isAdmin','readingRights','writingRights',"canCreateStreams","edit"];
  dataSource!: MatTableDataSource<User>;
  form!: FormGroup;
  users :any;
  userArray:User[]=[];
  allowedStreamsFC = new FormControl;
  
  
  

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  constructor(private authservice: AuthService,private chronicleService:ChronicleService,private dialogService : DialogService,public dialog:MatDialog) {
    
    
  }
  ngOnInit() {
    this.chronicleService.getStreamsFromChronicle();
    this.userArray=[];
    this.chronicleService.getHttp().get(BACKEND_URL+"/allusers",{responseType:"json"}).subscribe((response:any) => {
      this.users = response;
      for (let index = 0; index < (response.users).length; index++) {
        let newUser: User={
        username:response.users[index].username,
        isAdmin:response.users[index].isAdmin,
        canCreateStreams:response.users[index].canCreateStreams,
        allStreamsAllowed:response.users[index].allStreamsAllowed,
        allowedStreams:response.users[index].allowedStreams,
        canInsertAll:response.users[index].canInsertAll,
        allowedInsertStreams:response.users[index].allowedInsertStreams
      }
      this.userArray.push(newUser)
      }
     
      this.dataSource = new MatTableDataSource<User>(this.userArray);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
      
     })

     
  }
 
 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  addUser(){
    const dialogRef= this.dialog.open(AddUserComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }
 

  deleteUser(user:string){
    const dialogRef= this.dialog.open(DoubleCheckDialog)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let tmp = JSON.stringify(user)
        this.chronicleService.getHttp().post(BACKEND_URL+"delete_user",tmp).subscribe((response:any) => {
        console.log(response)
        })
        this.ngOnInit()
      }else{}
    });
    
  }
  editUser(user:string){
    const dialogRef= this.dialog.open(EditUserComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }
}





@Component({
  selector: 'double-check-dialog',
  templateUrl: 'double-check-dialog.html',
})
export class DoubleCheckDialog {
}


