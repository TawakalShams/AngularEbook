import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  id:any;
  deteleData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteUserComponent>
    ) { }

  ngOnInit(): void {
  }
  yes(id: any) {
    id = this.Data;
    this.service.deleteUser(id).subscribe((data) =>{
      this.deteleData = data;
         if(!this.deteleData){
           this.toastr.success('Successfully to delete','Successfully');
           this.router
           .navigateByUrl('/', { skipLocationChange: true })
           .then(() => {
             this.router.navigate(['viewusers']);
           });
           this.dialogRef.close();
         }else {
          this.toastr.error('Not Successfully to Delete', 'Error');
        }
    })

  }
}
