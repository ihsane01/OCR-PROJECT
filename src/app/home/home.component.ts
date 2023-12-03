import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null | undefined = null;
  responseMessage: string = '';
  datemessage: string = '';
  constructor(private employeeService:EmployeeService, private router : Router,private route : ActivatedRoute) { }

  ngOnInit(): void {

  }

  selectedFile: File | null = null;



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
       this.imageUrl = e.target?.result;
      };

      reader.readAsDataURL(this.selectedFile);
  }
}

  uploadImage() {
    if (this.selectedFile) {
      this.employeeService.insert(this.selectedFile).subscribe(
        response => {
          console.log('Image uploaded successfully:', response);
          const jsonResponse = JSON.parse(JSON.stringify(response)); // Parse JSON
          this.responseMessage =  jsonResponse.total;
          this.datemessage =  jsonResponse.date;

        },
        error => {
          console.error('Error uploading image:', error);
          this.responseMessage = 'Error uploading image: ' + error.message;

        }
      );
    } else {
      console.error('No file selected.');
      this.responseMessage = 'No file selected.';

    }
  }
}
