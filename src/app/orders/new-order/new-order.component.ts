import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../../core/services/data.service';
import { ICustomer, INewOrder, IOrderItem, IOrder } from '../../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../../core/growler/growler.service';
import { LoggerService } from '../../core/services/logger.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  public title = "New Order";
  public order: INewOrder =
    {
      id: 0,
      products:[],
      customerId: null
    };
  public customers: ICustomer[] = [];
  public products: IOrderItem[] = []
  public product: IOrder = this.getDefaultProduct();
  public totalAmount = 0;
  errorMessage: string;
  @ViewChild('orderForm', { static: true }) orderForm: NgForm;

  constructor(private router: Router,
    private dataService: DataService,
    private growler: GrowlerService,
    private logger: LoggerService) { }

  ngOnInit() {

    this.initData();
  }

  initData() {

    forkJoin(this.dataService.getCustomers(), this.dataService.getProducts()).subscribe(res => {
      this.customers = res[0];
      this.products = res[1];
    }, err => console.log(err))

  }

  handleProductSelected(productName) {
    this.product.itemCost = this.getProductCost(productName);
  }

  handleAddItemClicked(event: Event) {
    event.preventDefault();
    this.product.totalAmount = this.product.itemCost * this.product.quantity;
    this.order.products.push(this.product);
    this.totalAmount += this.product.itemCost;
    this.product = this.getDefaultProduct();
  }

  submit() {
    this.dataService.insertOrder(this.order)
        .subscribe((insertedOrder: INewOrder) => {
          if (insertedOrder) {
            this.orderForm.form.markAsPristine();
            this.router.navigate(['/orders']);
          } else {
            const msg = 'Unable to insert order';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg; 
          }
        },
          (err: any) => {
            this.logger.log(err)
          });
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/orders']);
  } 

  private getDefaultProduct(): IOrder {
    return {
      productName: null,
      quantity: 1,
      itemCost: null
    }
  }

  private getProductCost(productName) {
    const itemCost = this.products.filter(product => productName === product.productName)[0].itemCost;
    return itemCost || null;
  }

}
