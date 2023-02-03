import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { DeleteBookComponent } from 'src/app/dialog/delete/delete-book/delete-book.component';
import { MakePaymentComponent } from 'src/app/dialog/make-payment/make-payment.component';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';
import  jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-my-customer-orders',
  templateUrl: './my-customer-orders.component.html',
  styleUrls: ['./my-customer-orders.component.css'],
})
export class MyCustomerOrdersComponent implements OnInit {
  application: any;
  role_id: any;
  id: any;

  'dataSource': MatTableDataSource<MyCustomerOrdersComponent>;

  columns: string[] = ['title', 'author', 'selling', 'View'];
  @ViewChild(MatSort, { static: true }) 'sort': MatSort;
  @ViewChild(MatPaginator, { static: true }) 'paginator': MatPaginator;
  constructor(
    private service: ServiceService,
    public dialog: MatDialog,
    // private helper: JwtHelperService,
    private sanitizer: DomSanitizer
  ) {
    const token = localStorage.getItem('token');
    // const decodedToken: DecodedToken = helper.decodeToken(token as string);
    const decodedToken = this.service.getUser()

    this.role_id = decodedToken.role_id;
    this.id = decodedToken.id;
  }

  ngOnInit(): void {
    this.service.getByIdToMyBooks(this.id).subscribe((response) => {
      this.application = response;
      this.dataSource = new MatTableDataSource(this.application);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  payment(row: any) {
    const dialogRef = this.dialog.open(MakePaymentComponent, {
      data: row,
    });
  }
  fileUrl: any;
  download(row: any) {

    const pdf = "https://api-backend.pengurusanconsultants.co.tz/storage/" +row.book;
  //  console.log(pdf)
   saveAs(pdf, row.title)

  // }
  // const blob = new Blob([data], {type: 'application/octet-stream'});

  // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    // console.log( this.fileUrl)
}
  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
