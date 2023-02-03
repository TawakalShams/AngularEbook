import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;
  fullname: any;
  id: any;
  items: any;
  constructor(
    private cartService: ServiceService,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullname = decodedToken.fullName;
    this.id = decodedToken.id;
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      let grandTotal: number = 0;
      res.map((a: any) => {});
    });
  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }

  form = new FormGroup({
    customer_id: new FormControl('', [Validators.required]),
    book_id: new FormControl('', [Validators.required]),
  });
  save(item: any) {
    this.items = item.id;
    this.cartService.createToMyBooks(this.form.value).subscribe((data) => {
      this.toastr.success('Successfully to Create', 'Successfully');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['shopping-cart']);
      });
    }),
      (error: any) => {
        console.log(error);
        this.toastr.error('Not Successfully to Create', 'Error');
      };
  }
}
