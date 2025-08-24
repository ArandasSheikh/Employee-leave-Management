import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  constructor(private router: Router) {}

  logout() {
    alert("You have logged out!");
    this.router.navigate(['/login']); // redirect to dashboard
  }

}
