import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface DecodedToken {
  email: any;
  id?: string;
  fullName?: string;
  role_id?: number;
  gender: any;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MyModelModule {
  role_id: any;
  fullName: string | undefined;
  email: any;
  password: any;
  gender: any;
  address: any;
  branch: any;
  dob: any;
  phone: any;
  platenumber: any;
  type: any;
  model: any;
  id:any;
}
