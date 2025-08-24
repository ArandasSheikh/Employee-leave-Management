import { Component, inject } from '@angular/core';
import { Authservice } from '../../service/authservice';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee {

  authservice = inject(Authservice)
  employees :any[]=[];
  

  ngOnInit():void{
    this.loademployee();
  }

loademployee(){
    console.log("🔄 Calling GetEmployees API...");
    this.authservice.getAllemployee().subscribe({
      next: (res) => {
        console.log("✅ API Response:", res);
        this.employees = res.data || res; // response me data key ho to use karo
      },
      error:(err)=>{
        console.error("❌ Error fetching employees:", err);
      }
    });
  }
}
