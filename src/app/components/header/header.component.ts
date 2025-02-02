import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ModalComponent} from "../modal/modal.component";

@Component({
    selector: 'app-header',
    imports: [CommonModule, ModalComponent, ModalComponent],
    template: `
    <header class="fixed w-full z-50 transition-all duration-300"
            [class.scrolled]="isScrolled()"
            [class.lg:bg-white]="isScrolled()">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-20">
          <!-- Логотип (скрыт на мобильных) -->
          <div class="logo hidden lg:block">
            <img src="/assets/images/teaday.png" alt="TEADAY" class="h-8">
          </div>

          <!-- Пустой div для сохранения flex-структуры на мобильных -->
          <div class="lg:hidden"></div>

          <!-- Основное меню -->
          <div class="hidden lg:flex items-center space-x-8">
            <a *ngFor="let item of menuItems()"
               [href]="item.href"
               class="text-gray-800 hover:text-primary transition-colors">
              {{item.title}}
            </a>
          </div>

          <!-- Кнопка связаться -->
          <button
            class="hidden lg:block bg-coral text-white px-6 py-2 rounded hover:bg-coral-dark transition-colors"
            (click)="showModal()">
            СВЯЗАТЬСЯ С НАМИ
          </button>

          <!-- Мобильное меню -->
          <button class="lg:hidden p-2 rounded-full bg-white shadow-md" (click)="toggleMenu()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    [attr.d]="isMenuOpen() ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
            </svg>
          </button>
        </nav>

        <!-- Затемненный фон -->
        <div *ngIf="isMenuOpen()"
             class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
             (click)="toggleMenu()">
        </div>

        <!-- Мобильное выпадающее меню -->
        <div class="lg:hidden fixed right-0 top-0 w-1/2 bg-gradient-to-b from-slate-900 to-blue-900 h-screen shadow-xl"
             [class.hidden]="!isMenuOpen()"
             [@slideDown]="isMenuOpen() ? 'open' : 'closed'">
          <!-- Мобильный логотип -->
          <div class="p-6 border-b border-blue-700/30">
            <img src="/assets/images/teaday.png" alt="TEADAY" class="h-8">
          </div>
          <div class="py-4">
            <a *ngFor="let item of menuItems()"
               [href]="item.href"
               (click)="navigateToSection(item.href)"
               class="block py-3 px-6 text-blue-100 hover:bg-blue-800/30 hover:text-white transition-all duration-200">
              {{item.title}}
            </a>
            <div class="px-6 pt-6">
              <button
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors font-semibold"
                (click)="showModal()">
                СВЯЗАТЬСЯ С НАМИ
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Модальное окно -->
    <app-modal
      *ngIf="isModalOpen()"
      (close)="closeModal()">
    </app-modal>
  `,
    styles: [`
    :host {
      display: block;
    }

    .scrolled {
      @apply lg:shadow-md;
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
                transform: 'translateX(100%)',
                opacity: '0'
            })),
            state('open', style({
                transform: 'translateX(0)',
                opacity: '1'
            })),
            transition('closed <=> open', animate('300ms ease-in-out'))
        ])
    ]
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  isModalOpen = signal(false);

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

  showModal() {
    this.isModalOpen.set(true);
    this.isMenuOpen.set(false); // Закрываем мобильное меню при открытии модалки
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  navigateToSection(href: string) {
    this.toggleMenu();

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  }
}
