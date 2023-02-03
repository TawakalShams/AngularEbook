import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  id:any;
  deteleData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteBookComponent>
  ) { }

  ngOnInit(): void {
  }
  yes(id: any) {
    id = this.Data.id;
    this.service.deleteBook(id).subscribe((data) =>{
      this.deteleData = data;
         if(!this.deteleData){
           this.toastr.success('Successfully to delete','Successfully');
           this.router
           .navigateByUrl('/', { skipLocationChange: true })
           .then(() => {
             this.router.navigate(['managebooks']);
           });
           this.dialogRef.close();
         }else {
          this.toastr.error('Not Successfully to Delete', 'Error');
        }
    })

  }
}
