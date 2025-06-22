import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuActive = false;
  scrolled = false;
  isBrowser: boolean;

  mostrarLogin = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleMenu() {
    if (!this.isBrowser) return;

    this.isMenuActive = !this.isMenuActive;

    if (this.isMenuActive) {
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    if (this.isBrowser && !this.isMenuActive) {
      this.scrolled = window.scrollY > 0;
    }
  }

  navItems = [
    { name: 'Inicio', href: '/', exact: true },
    { name: '¿Qué somos?', href: '/nosotros' },
    {
      name: 'Eventos', href: '/eventos'},
    { name: 'Galeria', href: '/galeria' },
    { name: 'Testimonios', href: '/testimonios' }
  ];
}
