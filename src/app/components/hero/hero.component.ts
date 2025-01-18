import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollService} from "../../services/scroll.service";

interface TeaCup {
  image: string;
  name: string;
  color: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>HERO-COMPONENT</h1>
    <section class="min-h-screen flex items-center relative overflow-hidden bg-white">
      <!-- Декоративный фон -->
      <div class="absolute inset-0 bg-gradient-to-b from-coral-light/20 to-transparent"></div>

      <!-- Основной контент -->
      <div class="container mx-auto px-4 pt-20 lg:pt-0 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Левая часть -->
          <div class="lg:w-1/2 text-center lg:text-left" #leftContent>
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              СТАНЬ ПАРТНЕРОМ
              <span class="text-coral block mt-2">TEADAY</span>
            </h1>
            <p class="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Присоединяйтесь к успешной сети чайных магазинов и создавайте
              уникальные вкусовые впечатления вместе с нами
            </p>
            <button
              (click)="scrollToContacts()"
              class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white
                     bg-black rounded-lg transition-transform hover:transform hover:-translate-y-1
                     active:translate-y-0 shadow-lg hover:shadow-xl">
              ОСТАВИТЬ ЗАЯВКУ
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <!-- Правая часть -->
          <div class="lg:w-1/2 relative" #rightContent>
            <!-- Карусель чашек -->
            <div class="relative h-[400px] w-full">
              <div *ngFor="let cup of teaCups; let i = index"
                   class="absolute w-full transition-all duration-500"
                   [style.opacity]="currentIndex === i ? '1' : '0'"
                   [style.transform]="currentIndex === i ? 'scale(1)' : 'scale(0.9)'">
                <img [src]="cup.image"
                     [alt]="cup.name"
                     class="w-full h-full object-contain">
                <!-- Цветовой акцент -->
                <div class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            w-72 h-72 rounded-full blur-3xl opacity-20"
                     [style.background-color]="cup.color">
                </div>
              </div>
            </div>

            <!-- Навигация карусели -->
            <div class="flex justify-center gap-2 mt-6">
              <button *ngFor="let cup of teaCups; let i = index"
                      (click)="setSlide(i)"
                      class="w-3 h-3 rounded-full transition-all"
                      [class]="currentIndex === i ? 'bg-coral scale-125' : 'bg-gray-300'">
              </button>
            </div>

            <!-- Декоративные элементы -->
            <div class="absolute -top-10 -right-10 w-40 h-40 text-coral/10 animate-spin-slow">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M50 0A50 50 0 1050 100A50 50 0 1050 0" fill="none" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижний декор -->
      <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent">
      </div>
    </section>
  `,
  styles: [`
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }

    :host {
      display: block;
      position: relative;
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private slideInterval: number | undefined;

  currentIndex = 0;

  teaCups: TeaCup[] = [
    {
      image: 'assets/images/classic-tea.svg',
      name: 'Классический чай',
      color: '#FFD700'
    },
    {
      image: 'assets/images/bubble-tea.svg',
      name: 'Bubble Tea',
      color: '#FF69B4'
    },
    {
      image: 'assets/images/fruit-tea.svg',
      name: 'Фруктовый чай',
      color: '#FF6B6B'
    }
  ];

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }

  private startSlideshow() {
    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopSlideshow() {
    if (this.slideInterval) {
      window.clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.teaCups.length;
  }

  setSlide(index: number) {
    this.currentIndex = index;
    // Перезапускаем слайдшоу при ручном переключении
    this.stopSlideshow();
    this.startSlideshow();
  }

  scrollToContacts(): void {
    this.scrollService.scrollToElement('contacts');
  }
}
