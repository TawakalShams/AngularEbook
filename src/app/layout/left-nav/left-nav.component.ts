import { Component, OnInit } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/my-model/my-model.module';
// import { ListOfBooksComponent } from 'src/app/pages/shared/products/list-of-books/list-of-books.component';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  panelOpenState = false;
  fullname:any;
  role_id:any;
  email:any;
  public total: number = 0;
  constructor(
    // private helper: JwtHelperService,
    private servicee: ServiceService,
    // private count: ListOfBooksComponent

  ) {
    const token = localStorage.getItem('token');
    const decodedToken = this.servicee.getUser()
    // const decodedToken: DecodedToken = {fullName: 'Tawakal Shams', role_id: 1, 'gender': 'Male', 'email': 'taw@gmal.com'};
    this.fullname = decodedToken.fullName;
    this.role_id = decodedToken.role_id;
    this.email = decodedToken.email;
   }
  //  addTocart(dataa:any){
  //   console.log(this.total++)
  // }
  ngOnInit(): void {
    this.servicee.getProducts().subscribe(resp =>{
      this.total = resp.length;
    })
    // console.log(this.total++)
    //   this.servicee.getAllBooks().subscribe(resp =>{

    //   })
  }

}
