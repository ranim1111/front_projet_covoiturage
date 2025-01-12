import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
 showingPage: string = 'home-page';
 navItems = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleView(): void {
    this.showingPage = this.showingPage == 'login-page' ? 'home-page' : 'login-page';
  }
  navigateToLoginPage() {
    this.router.navigate(['/login-page']);
  }
}