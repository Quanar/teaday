import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private isScrolled = signal<boolean>(false);
  private lastScrollPosition = 0;
  private scrollDirection = signal<'up' | 'down'>('up');

  constructor() {
    this.initScrollListener();
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', () => {
      // Определяем, прокручена ли страница
      this.isScrolled.set(window.scrollY > 50);

      // Определяем направление прокрутки
      const currentScroll = window.scrollY;
      if (currentScroll > this.lastScrollPosition) {
        this.scrollDirection.set('down');
      } else {
        this.scrollDirection.set('up');
      }
      this.lastScrollPosition = currentScroll;
    });
  }

  getIsScrolled() {
    return this.isScrolled.asReadonly();
  }

  getScrollDirection() {
    return this.scrollDirection.asReadonly();
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80; // Высота фиксированного хедера
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
