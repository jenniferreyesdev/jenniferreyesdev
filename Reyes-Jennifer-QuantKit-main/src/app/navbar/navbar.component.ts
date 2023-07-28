import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated?: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      res => this.isAuthenticated = res
    )
  }

}
