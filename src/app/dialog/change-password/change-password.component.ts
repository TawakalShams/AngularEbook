import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  role_id: any;
  id: any;
  constructor(
    private helper: JwtHelperService,
    @Inject(MAT_DIALOG_DATA) public dataa: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.role_id = decodedToken.role_id;
    this.id = decodedToken.id;
  }
  loginForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
  });
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    // console.log(this.role_id)
  }
  Dta: any;
  submit() {
    this.service
      .changepassword(this.id, this.loginForm.value)
      .subscribe((data) => {
        this.Dta = data;
        if (!this.Dta) {
          this.toastr.success('Successfully', 'Successfully');
          // this.router
          // .navigateByUrl('/', { skipLocationChange: true })
          // .then(() => {
          //   this.router.navigate(['viewusers']);
          // });
          this.dialogRef.close();
        } else {
          this.toastr.error('Not Successfully', 'Error');
        }
      });
  }
}
