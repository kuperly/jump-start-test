import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CanActivateGuard } from '../customer/guards/can-activate.guard';

const routes: Routes = [
  { 
    path: '', 
    component: OrdersComponent, 
  },
  { 
    path: 'new-order',
    component: NewOrderComponent,
    canActivate: [CanActivateGuard]
  }
  
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [CanActivateGuard]
})
export class OrdersRoutingModule {
  static components = [ OrdersComponent, NewOrderComponent, OrderSummaryComponent ];
}
