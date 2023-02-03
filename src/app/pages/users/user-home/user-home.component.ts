import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookDescriptionComponent } from 'src/app/dialog/book-description/book-description.component';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  title: any;
  author: any;
  selling: any;
  data: any;
  row: any;
  role_id: any;
  id: any;
  book: any;
  image: any;
  public total: number = 0;
  public products: any = [];
  balance: any;
  customer_id: any;
  book_id: any;
  sum: any;
  constructor(
    private service: ServiceService,
    public dialog: MatDialog,
    //  private helper: JwtHelperService,
    private toastr: ToastrService,
    //  private router: Router

  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = this.service.getUser();
    // console.log(this.service.getUser().role_id)
    this.role_id = this.service.getUser().role_id;
    // this.id = decodedToken.id;
  }

  ngOnInit(): void {
    this.listBooks();
    this.customer_id = this.id
    // console.log(this.role_id)
    // this.getTotalPayment();
  }
  form = new FormGroup({
    customer_id: new FormControl(['']),
    book_id: new FormControl([''])
  })

  // getTotalPayment() {
  //   this.service.getTotalPayment().subscribe(response => {
  //     this.balance = response;

  //     this.sum = this.balance.balance;

  //   });
  // }

  addTocart(dataa: any) {
    this.form.patchValue({
      book_id: dataa.id,
    })
    this.form.patchValue({
      customer_id: this.service.getUser().id,
    })

    this.service.createToMyBooks(this.form.value).subscribe((data) => {
      const status = data.status

      if (status == 1) {
        this.toastr.success("successfully");
      } else {
        this.toastr.error("Alerady have");
      }
    })
  }

  desc(dataa: any) {
    const dialogRef = this.dialog.open(BookDescriptionComponent, {
      data: dataa,
    });
  }
  images: any;
  listBooks() {
    this.service.getAllBooks().subscribe(res => {
      this.data = res;
      this.row = res;
      this.data.forEach((a: any) => {
        Object.assign(a, { quatity: 1, total: a.price })
      });
    });
  }
  getOneBook(id: any) {
    this.service.getByIdBook(id).subscribe(res => {

    })
  }
}
