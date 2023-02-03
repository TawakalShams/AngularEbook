import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-assign-teacher-to-class',
  templateUrl: './assign-teacher-to-class.component.html',
  styleUrls: ['./assign-teacher-to-class.component.css']
})
export class AssignTeacherToClassComponent implements OnInit {


  data:any;

  constructor(
    private service: ServiceService,
     private toastr: ToastrService ,
     private router: Router,
    private dialogRef: MatDialogRef<AssignTeacherToClassComponent>

     ) { }

  ngOnInit(): void {
  }

  get name() {
    return this.form.get('name');
  }

  get sections() {
    return this.form.get('sections');
  }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
    sections: new FormControl('', [
      Validators.required,
      // Validators.minLength(5)
    ]),
  });


  submit(){
    // console.log(this.form.value)

  }
}

