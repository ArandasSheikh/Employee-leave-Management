import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Authservice } from '../../service/authservice';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.html',
  styleUrls: ['./employee.scss']
})
export class Employee {

  authservice = inject(Authservice);
  employees: any[] = [];

  // 👇 Modal reference
  @ViewChild('modalRef') modal!: ElementRef;

  ngOnInit(): void {
    this.loademployee();
  }

  loademployee() {
    console.log("🔄 Calling GetEmployees API...");
    this.authservice.getAllemployee().subscribe({
      next: (res) => {
        console.log("✅ API Response:", res);
        this.employees = res.data || res;
      },
      error: (err) => {
        console.error("❌ Error fetching employees:", err);
      }
    });
  }

  // 👇 Modal control methods
  openModal() {
    this.modal.nativeElement.classList.remove('hidden');
  }

  closeModal() {
    this.modal.nativeElement.classList.add('hidden');
  }
}
