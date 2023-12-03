import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/';
  constructor(private httpClient: HttpClient,private router: Router) { }
  insert(file: File ){


    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.httpClient.post(`${this.apiUrl}/process_image`, formData);

  }
}
