import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input() products: IOrder[];
  @Input() totalAmount: number = 0;

  constructor() { }

  ngOnInit() {    

  }

}
