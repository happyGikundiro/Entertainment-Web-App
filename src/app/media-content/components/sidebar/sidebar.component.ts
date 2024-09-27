import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from '../../../auth/auth.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isModalOpen: boolean = false;

  constructor(private router: Router, private authService: AuthServices) {}

  navigateTo(route: string) {
    this.router.navigate([`/home/${route}`]);
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']); 
    });
  }
}
