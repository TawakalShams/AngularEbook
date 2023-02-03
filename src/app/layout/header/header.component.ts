import { Router } from '@angular/router';
import { AssignTeacherToClassComponent } from './../../dialog/assign-teacher-to-class/assign-teacher-to-class.component';
import { ClassComponent } from './../../dialog/class/class.component';
import { ChangePasswordComponent } from './../../dialog/change-password/change-password.component';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/my-model/my-model.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullname:any;
  role_id:any;
  email:any;
  row:any;
  gender: any;
  constructor(
    // private helper: JwtHelperService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private service:ServiceService,
    private router:Router

  ) {
    const token = localStorage.getItem('token');
    // const decodedToken: DecodedToken = {fullName: 'Tawakal Shams', role_id: 1, 'gender': 'Male', 'email': 'taw@gmal.com'};
    const decodedToken = this.service.getUser()
    this.fullname = decodedToken.fullName;
    this.role_id = decodedToken.role_id;
    this.email = decodedToken.email;
    this.gender = decodedToken.gender;
   }

  ngOnInit(): void {
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  changepassword(row: any){
        this.dialog.open(ChangePasswordComponent, {
          data: row,
    });
  }


  // openDialog(row: any) {
  //   this.dialog.open(ChangePasswordComponent, {
  //     data: row,
  //   });
  // }
  logout() {
    const log = this.service.logout();
    const redirect = this.service.redirectUrl
      ? this.service.redirectUrl
      : '/login';
    this.router.navigate([redirect]);
  }
}
