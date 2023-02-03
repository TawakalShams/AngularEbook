import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css']
})
export class BookDescriptionComponent implements OnInit {
  data:any;
  description:any;
  title:any;
  author:any;
  year:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataa: any,
    public dialog: MatDialog,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    this.data = this.dataa;
    this.title = this.data.title;
    this.author = this.data.author;
    this.description = this.data.description;
    this.year = this.data.year;
  }
getBookById(id:any){
  this.service.getByIdBook(id).subscribe(res=>{

  })
}
}
