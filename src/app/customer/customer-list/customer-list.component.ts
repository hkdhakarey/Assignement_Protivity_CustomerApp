import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {
  CustomerList: Customer[];
  SelectedPageCustomerList: Customer[];
  PageNo = 0;
  PageSize = 6;
  Pages: number[];
  AgeValue;
  GridView: boolean = true;
  constructor(private _customerService: CustomerService, private router: Router){
    this.CustomerList = [];
    this.Pages = [];
  }
  ngOnInit() {
    this.GetCustomerList();
  }
  GetCustomerList(){
    this.CustomerList = [];
    this._customerService.getAllCustomer().subscribe(res =>{
      this.CustomerList = res;
      this.PagingSetup();
    });
  }
  PagingSetup(){
    this.Pages = [];
    for(let i = 0; i < this.CustomerList.length/this.PageSize; i++){
      this.Pages.push(i);
    }
    this.SetPaging(0);
  }
  Search(){
    if(this.CustomerList.length == 0){
      this.GetCustomerList();
      this.AgeValue = null;
    }
    else if(this.AgeValue > 0){
      this._customerService.getCustomersByAge(this.AgeValue).subscribe(res =>{
        this.CustomerList = res;
        this.PagingSetup();
      });
    }
    else{
      alert("Invalid input");
      this.AgeValue = null;
    }
  }
  AddNewCustomer(){
    this.router.navigate(['/customer/insert']);
  }
  EditCustomer(id: any) {
    this.router.navigate(['/customer/update', id]);
  }
  getSvgDataUrl(svg: string): string {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  SetPaging(pageNo){
    if(pageNo >= 0){
      this.PageNo = pageNo;
      this.SelectedPageCustomerList = this.CustomerList.slice((this.PageNo * this.PageSize), ((this.PageNo + 1) * this.PageSize))
    }
  }
}
