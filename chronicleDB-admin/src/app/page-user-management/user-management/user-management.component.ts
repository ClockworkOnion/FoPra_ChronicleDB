import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from './../../services/auth.service';
import { ChronicleService } from './../../services/chronicle.service';
import { User } from './../../model/User';
import { AuthService } from 'src/app/services/auth.service';
import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import{MatSort} from '@angular/material/sort';
import {MatPaginator}from "@angular/material/paginator"
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent  {
  displayedColumns = ['username','isAdmin','allowedStreams',"canCreateStreams"];
  dataSource!: MatTableDataSource<User>;
  form!: FormGroup;
  users :any;
  userArray:User[]=[];
  allowedStreamsFC = new FormControl;
  
  

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  constructor(private authservice: AuthService,private chronicleService:ChronicleService) {
    this.chronicleService.getHttp().get(BACKEND_URL+"/allusers").subscribe((users:any) => {
      this.dataSource = new MatTableDataSource(users);
     });
    
    //});
  }
  ngOnInit() {
    this.chronicleService.getHttp().get(BACKEND_URL+"/allusers",{responseType:"json"}).subscribe((response:any) => {
      this.users = response;
      for (let index = 0; index < (response.users).length; index++) {
      console.log(response.users[index])
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
     })
     
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  test(){
    console.log(this.userArray)
    
    

    
  
   
    
    
  }

}



