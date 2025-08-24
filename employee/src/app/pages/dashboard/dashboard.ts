import { Component, inject } from '@angular/core';
import { Authservice } from '../../service/authservice';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private authservice = inject(Authservice);

  // Summary data (aap backend se bhi fetch kar sakte ho)
  totalEmployees = 0;
  totalLeaves = 0;
  pendingRequests = 0;
  approvedLeaves = 0;

  // Recent employees list
  recentEmployees: any[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  // ✅ Ye function sab data load karega
  loadDashboardData(): void {
    // Employees load karna
    this.authservice.getAllemployee().subscribe({
      next: (res) => {
        console.log("Dashboard API Response:", res);

        // Employees assign
        this.recentEmployees = (res.data || res).slice(0, 7);

        // Dummy summary stats (aap backend se bhi nikal sakte ho)
        this.totalEmployees = (res.data || res).length;
        this.totalLeaves = 45;
        this.pendingRequests = 12;
        this.approvedLeaves = 33;
      },
      error: (err) => {
        console.error("Error loading dashboard data:", err);
      }
    });
  }
}


