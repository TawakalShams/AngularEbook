import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { MyModelModule } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl!: string;
  error: {} | undefined;
  loginError!: string;
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: ServiceService,
    private toast: ToastrService
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      // Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
  });

  ngOnInit(): void { }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;
    this.service.login(this.loginForm.value).pipe(switchMap((data: any) => {
      this.service.setToken(data.token);
      return this.service.getAuthUser();
    })).subscribe(
      (data: any) => {
        localStorage.setItem('auth_user', btoa(JSON.stringify(data)))
          this.router.navigateByUrl("/home");

        const user = this.service.getUser();

        if (user.role_id == 1) {
          this.router.navigateByUrl("/home");
        } else {
          this.router.navigateByUrl("/Uhome");
        }
        this.toast.success('Success to login', 'Success');
      },
      (error) => {
        this.toast.error(error.message, 'Error');
      }
    );
  }


}
