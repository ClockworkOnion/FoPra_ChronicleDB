import { BACKEND_URL } from './../../services/auth.service';
import { ChronicleService } from './../../services/chronicle.service';
import { User } from './../../model/User';
import { AuthService } from 'src/app/services/auth.service';
import {Component, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import{MatSort} from '@angular/material/sort';
import {MatPaginator}from "@angular/material/paginator"

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  displayedColumns = ['username','vorname','name', 'allowed_streams','allowed_insert_streams',"created","last_logged_in"];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  constructor(private authservice: AuthService,private chronicleService:ChronicleService) {
    this.chronicleService.getHttp().get(BACKEND_URL+"/allusers").subscribe((users:any) => {
      this.dataSource = new MatTableDataSource(users);
     });
    
    //});
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  test(){
    let res = (this.chronicleService.getHttp().get(BACKEND_URL+"/allusers").subscribe(response => console.log(response)))
    
  }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

