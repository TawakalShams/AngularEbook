import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  data: any;
  @ViewChild('play') play: ElementRef | undefined;

  constructor(
    private service: ServiceService,
  ) { }

  ngOnInit(): void {
    // this. listBooks();
    // this.playy()
  }
  // playy(){
  //    this.play?.nativeElement.play()
  // }
  // listBooks(){
  //   this.service.getAllBooks().subscribe(res =>{
  //     this.data = res;
  //   });
  //   }
}
