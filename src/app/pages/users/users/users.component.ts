import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data:any;

  constructor(private service: ServiceService, private toastr: ToastrService ,private router: Router) { }

  ngOnInit(): void {
  }
  get fullName() {
    return this.form.get('fullName');
  }
  get email() {
    return this.form.get('email');
  }

  get role() {
    return this.form.get('role');
  }
  get password() {
    return this.form.get('password');
  }
  get gender() {
    return this.form.get('gender');
  }

  get dob() {
    return this.form.get('dob');
  }
  get address() {
    return this.form.get('address');
  }
  get phone() {
    return this.form.get('phone');
  }

  form = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    role_id: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    gender: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    // dob: new FormControl('', [
    //   Validators.required,
    //   // Validators.minLength(5)
    // ]),
    address: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    phone: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    email: new FormControl('', [
      Validators.email,
      // Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
  });


  submit(){
      this.service.createUser(this.form.value).subscribe(data =>{
        this.toastr.success('Successfully to Create', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['users']);
          });
      }),
      (error: any) => {
        console.log(error);
        this.toastr.error(
          'Not Successfully to Create, Pleas check email already exist',
          'Error'
        );
      }
  }
}
