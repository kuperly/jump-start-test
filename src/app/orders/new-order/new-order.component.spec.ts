import { element } from 'protractor';
import { NgForm, FormsModule } from '@angular/forms';
import { GrowlerService } from './../../core/growler/growler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DataService } from './../../core/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NewOrderComponent } from './new-order.component';
import { By } from '@angular/platform-browser';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ NewOrderComponent ],
      providers: [
        DataService, 
        HttpClient,
        HttpHandler, 
        { provide: 'Window', useFactory: () => window },
        GrowlerService,
        NgForm
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'New Order'`, async(() => {
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('New Order');
  }));

  it('should add item click enabled', () => {
    spyOn(component, 'handleAddItemClicked');
    component.product = {
      productName: 'test',
      quantity: 5,
      itemCost: 123
    };

    fixture.detectChanges();
    fixture.debugElement.query(By.css('#add-item-btn')).nativeElement.click();
    expect(component.handleAddItemClicked).toHaveBeenCalled();
  });

  it('should add item not clicked', () => {
    spyOn(component, 'handleAddItemClicked');
    component.product = {
      productName: null,
      quantity: 1,
      itemCost: 123
    };

    fixture.detectChanges();
    fixture.debugElement.query(By.css('#add-item-btn')).nativeElement.click();
    expect(component.handleAddItemClicked).not.toHaveBeenCalled();
  });

  it('should add item to be disabled', () => {
    spyOn(component, 'handleAddItemClicked');

    fixture.detectChanges();
    fixture.debugElement.query(By.css('#add-item-btn')).nativeElement.click();
    expect(component.handleAddItemClicked).not.toHaveBeenCalled();
  });

  it('should submit to be disabled', () => {
    spyOn(component, 'submit');

    fixture.detectChanges();
    fixture.debugElement.query(By.css('#submit-btn')).nativeElement.click();
    expect(component.submit).not.toHaveBeenCalled();
  });

});