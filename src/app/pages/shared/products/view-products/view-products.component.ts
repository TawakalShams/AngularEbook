import { query } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { DeleteBookComponent } from 'src/app/dialog/delete/delete-book/delete-book.component';
import { UpdateBooksComponent } from 'src/app/dialog/edit/update-books/update-books.component';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  application: any;
  role_id: any;

  'dataSource': MatTableDataSource<ViewProductsComponent>;

  columns: string[] = ['title', 'author', 'year', 'selling', 'View'];
  @ViewChild(MatSort, { static: true }) 'sort': MatSort;
  @ViewChild(MatPaginator, { static: true }) 'paginator': MatPaginator;
  constructor(
    private service: ServiceService,
    public dialog: MatDialog,
    // private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = this.service.getUser();
    this.role_id = decodedToken.role_id;
  }

  ngOnInit(): void {
    this.service.AllToMyBooks().subscribe((response) => {
      this.application = response;
      this.dataSource = new MatTableDataSource(this.application);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateBook(row: any) {
    const dialogRef = this.dialog.open(UpdateBooksComponent, {
      data: row,
    });
  }
  changepassword(row: any) {
    // const dialogRef = this.dialog.open(UpdateUserPasswordComponent, {
    //   data: row,
    // });
  }
  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  deleteBook(row: any) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: row,
    });
  }
}
