import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Customer {
  customerId: string;
  fullName: string;
  dateOfBirth: string;
  profileImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://localhost:7014/api/customers';

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<string> {
    return this.http.post<string>(this.apiUrl, customer);
  }
  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);
  }
  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getCustomersByAge(age: number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/${age}`);
  }

  patchCustomer(id: string, customer: Partial<Customer>): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, customer);
  }
}
