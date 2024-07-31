import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  Title: string = "Add New Customer";
  customerData: Customer;
  saving: boolean = false;
  constructor(private _customerService: CustomerService, 
    private router: Router, private route: ActivatedRoute){
    this.customerData = new Customer();
    this.saving = false;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let customerId = params.get('id');
      if(customerId != null){
        this.Title = "Update Customer";
      this.GetCustomerById(customerId);
      }
    });

  }  
  GetCustomerById(id){
    this._customerService.getCustomerById(id).subscribe(res =>{
      this.customerData = res;
    });
  }
  InsertCustomerData(ngForm: NgForm){
    debugger
    if(ngForm.valid){
      this.saving = true;
    if(!(this.customerData.customerId?.length > 0)){
      this._customerService.createCustomer(this.customerData).subscribe(res =>{
        if(res?.length > 0){
          alert("Customer Created Successfully.");
          this.router.navigate(['/customer']);
        }
      });
    }
    else{
      this._customerService.patchCustomer(this.customerData.customerId,this.customerData).subscribe(res =>{
        if(res != null){
          alert("Customer Updated Successfully.");
          this.router.navigate(['/customer']);
        }
      });
    }
  }
  }
}
