import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { observable } from 'rxjs';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  application: any;
  role_id: any;
  data:any;
  'dataSource': MatTableDataSource<AdminOrdersComponent>;

  columns: string[] = ['fullName','phone','title', 'author', 'selling','View'];
  @ViewChild(MatSort, { static: true }) 'sort': MatSort;
  @ViewChild(MatPaginator, { static: true }) 'paginator': MatPaginator;
  constructor(
    private service: ServiceService,
    public dialog: MatDialog,
    // private helper: JwtHelperService,
    private toastr: ToastrService ,
    private router: Router,
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = this.service.getUser();
    this.role_id = decodedToken.role_id;
  }

  ngOnInit(): void {
    this.service.getAllToMyBooks().subscribe((response) => {
      this.application = response;
      this.dataSource = new MatTableDataSource(this.application);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  form = new FormGroup({
    status: new FormControl('paid'),
  });
  locks = new FormGroup({
    status: new FormControl('unpaid'),
  });
  unlock(row: any) {
    this.service.paid(row.orderid, this.form.value).subscribe(res =>{
      this.data = res;
         if(this.data){
           this.toastr.success('Successfully','Successfully');
           this.router
           .navigateByUrl('/', { skipLocationChange: true })
           .then(() => {
             this.router.navigate(['adminorders']);
           });
         }else {
          this.toastr.error('Not Successfully', 'Error');
        }
    })

  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  lock(row: any) {
    this.service.unpaid(row.orderid, this.form.value).subscribe(res =>{
      this.data = res;
         if(this.data){
           this.toastr.success('Successfully','Successfully');
           this.router
           .navigateByUrl('/', { skipLocationChange: true })
           .then(() => {
             this.router.navigate(['adminorders']);
           });
         }else {
          this.toastr.error('Not Successfully', 'Error');
        }
    })
  }
}
