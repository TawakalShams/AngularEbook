import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-updateusers',
  templateUrl: './updateusers.component.html',
  styleUrls: ['./updateusers.component.css']
})
export class UpdateusersComponent implements OnInit {
  data:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataa: any,
    private service: ServiceService,
    private toastr: ToastrService ,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateusersComponent>

    ) { }

  ngOnInit(): void {
    this.ViewSingUser();
  }
  get fullName() {
    return this.form.get('fullName');
  }
  get email() {
    return this.form.get('email');
  }

  get role_id() {
    return this.form.get('role_id');
  }
  get password() {
    return this.form.get('password');
  }
  get gender() {
    return this.form.get('gender');
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
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
  });

  ViewSingUser() {
    this.service.getById(this.dataa.id).subscribe((datas: any) => {
      this.fullName?.setValue(datas.fullName);
      this.email?.setValue(datas.email);
      this.address?.setValue(datas.address);
      this.gender?.setValue(datas.gender);
      this.phone?.setValue(datas.phone);
    });
  }
  submit(){
    const updatae = this.service
    .updateUser(this.dataa.id, this.form.value)
    .subscribe((res) => {});
  if (updatae) {
    const acidentid = this.dataa.acidentid;
    this.toastr.success('Updated', 'Successfully');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['viewusers']);
    });
    this.dialogRef.close({ acidentid });
  }
      // this.service.updateUser(this.dataa,this.form.value).subscribe(data =>{
      //   console.log(data)
      //   this.toastr.success('Successfully', 'Successfully');
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => {
      //       this.router.navigate(['viewusers']);
      //     });
      //     this.dialogRef.close();
      // }),
      // (error: any) => {
      //   console.log(error);
      //   this.toastr.error(
      //     'Not Successfully',
      //     'Error'
      //   );
      // }
  }
}
