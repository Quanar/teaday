import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed w-full z-50 transition-all duration-300"
            [class.scrolled]="isScrolled()">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-20">
          <!-- Логотип -->
          <div class="logo">
            <img src="/assets/images/teaday.png" alt="TEADAY" class="h-8">
          </div>

          <!-- Основное меню -->
          <div class="hidden lg:flex items-center space-x-8">
            <a *ngFor="let item of menuItems()"
               [href]="item.href"
               class="text-gray-800 hover:text-primary transition-colors">
              {{item.title}}
            </a>
          </div>

          <!-- Кнопка связаться -->
          <button class="hidden lg:block bg-coral text-white px-6 py-2 rounded hover:bg-coral-dark transition-colors">
            СВЯЗАТЬСЯ С НАМИ
          </button>

          <!-- Мобильное меню -->
          <button class="lg:hidden" (click)="toggleMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    [attr.d]="isMenuOpen() ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
            </svg>
          </button>
        </nav>

        <!-- Мобильное выпадающее меню -->
        <div class="lg:hidden"
             [class.hidden]="!isMenuOpen()"
             [@slideDown]="isMenuOpen() ? 'open' : 'closed'">
          <div class="py-2">
            <a *ngFor="let item of menuItems()"
               [href]="item.href"
               class="block py-2 px-4 text-gray-800 hover:bg-gray-100">
              {{item.title}}
            </a>
            <button class="w-full text-left px-4 py-2 text-coral font-semibold">
              СВЯЗАТЬСЯ С НАМИ
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }

    .scrolled {
      @apply bg-white shadow-md;
    }

    .logo img {
      transition: height 0.3s ease;
    }

    .scrolled .logo img {
      height: 1.75rem;
    }
  `],
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        opacity: '0'
      })),
      state('open', style({
        height: '*',
        opacity: '1'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  menuItems = signal([
    { title: 'КОНЦЕПЦИЯ', href: '#concept' },
    { title: 'ЦИФРЫ', href: '#metrics' },
    { title: 'КАК СТАТЬ ПАРТНЕРОМ', href: '#partnership' },
    { title: 'ГЕОГРАФИЯ', href: '#geography' },
    { title: 'КОНТАКТЫ', href: '#contacts' }
  ]);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 60);
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}
