import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-register-customers',
  templateUrl: './register-customers.component.html',
  styleUrls: ['./register-customers.component.css']
})
export class RegisterCustomersComponent implements OnInit {

  data: any;


  submitted = false;
  returnUrl!: string;
  error: {} | undefined;
  loginError!: string;
  hide = true;
  datas: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: ServiceService,
    private toast: ToastrService,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      // Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
    gender: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
    address: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
    phone: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
    fullName: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
  });

  ngOnInit(): void {}
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.service.registerUsers(this.loginForm.value).subscribe(data =>{
      this.datas = data;
      if(this.datas.status === 1){
        this.router.navigate(['/login']);
        this.toast.success(JSON.stringify(this.datas.message),'');
      }else{
        this.toast.error(JSON.stringify(this.datas.message),'');
      }
    })
  }
}
