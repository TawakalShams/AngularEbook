import { UpdateusersComponent } from './../../../dialog/edit/updateusers/updateusers.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { ServiceService } from 'src/app/service/service.service';
import { UsersComponent } from '../users/users.component';
import { DeleteUserComponent } from 'src/app/dialog/delete/delete-user/delete-user.component';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {
  application:any;


  isLoading = false;

  'dataSource':MatTableDataSource<UsersComponent>;

  columns:string[]=['fullName','email','name','address','gender','View'];
  @ViewChild(MatSort, {static: true}) 'sort':MatSort;
  @ViewChild(MatPaginator, { static: true }) 'paginator': MatPaginator;
    constructor(
      private service: ServiceService,
      public dialog: MatDialog
      ) { }

      positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
      position = new FormControl(this.positionOptions[0]);

    ngOnInit(): void {
        this.viewAllUsers();
    }
    viewAllUsers(){
      this.service.getAllUsers().subscribe((data: any) => {
        // console.log(data)
        this.application=data;
        this.dataSource = new MatTableDataSource(this.application);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

    applyFilter(e:any){
      const filterValue = (e.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }
    openDialog(row: any) {
      // console.log(row)
      this.dialog.open(UpdateusersComponent, {
        data: row,
      });
    }

    deleteUser(row: any){
      // console.log(row)
      this.dialog.open(DeleteUserComponent, {
        data: row,
      });
    }
  }
