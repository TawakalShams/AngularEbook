import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  selling: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) { }

  ngOnInit(): void {
    this.selling = this.Data.selling;
  }

}
