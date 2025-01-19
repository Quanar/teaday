import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from "../../services/scroll.service";
import {ModalComponent} from "../modal/modal.component";

interface TeaCup {
  image: string;
  name: string;
  color: string;
  id: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  template: `
    <section
      class="min-h-screen flex items-center relative overflow-hidden bg-white"
      role="banner"
      aria-label="Главный баннер">
      <!-- Декоративный фон -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-coral-light/20 to-transparent"
        aria-hidden="true">
      </div>

      <!-- Основной контент -->
      <div class="container mx-auto px-4 pt-20 lg:pt-0 relative">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Левая часть -->
          <div
            class="lg:w-1/2 text-center lg:text-left relative z-20"
            #leftContent
            role="presentation">
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              СТАНЬ ПАРТНЕРОМ
              <img
                src="assets/images/teaday.png"
                alt="TeaDay Logo"
                class="h-12 sm:h-14 md:h-16 lg:h-20 mt-2 object-contain mx-auto lg:mx-0 block"
                loading="lazy"
                (error)="handleImageError($event)"
              />
            </h1>
            <p class="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Присоединяйтесь к успешной сети чайных магазинов и создавайте
              уникальные вкусовые впечатления вместе с нами
            </p>
            <button
              (click)="openModal()"
              class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white
                     bg-[#0066FF] rounded-lg transition-transform hover:transform hover:-translate-y-1
                     active:translate-y-0 shadow-lg hover:shadow-xl relative z-20 hover:bg-blue-600"
              aria-label="Оставить заявку на партнерство">
              ОСТАВИТЬ ЗАЯВКУ
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <!-- Правая часть -->
          <div
            class="lg:w-1/2 relative z-10"
            #rightContent
            role="region"
            aria-label="Карусель с изображениями чая">
            <!-- Карусель чашек -->
            <div class="relative h-[400px] w-full">
              <div
                *ngFor="let cup of teaCups; let i = index; trackBy: trackByFn"
                class="absolute w-full transition-all duration-500"
                [style.opacity]="currentIndex === i ? '1' : '0'"
                [style.transform]="currentIndex === i ? 'scale(1)' : 'scale(0.9)'">
                <img
                  [src]="cup.image"
                  [alt]="cup.name"
                  class="w-full h-full object-contain"
                  (error)="handleImageError($event)"
                  loading="lazy">
                <!-- Цветовой акцент -->
                <div
                  class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         w-72 h-72 rounded-full blur-3xl opacity-20"
                  [style.background-color]="cup.color"
                  aria-hidden="true">
                </div>
              </div>
            </div>

            <!-- Навигация карусели -->
            <div
              class="flex justify-center gap-2 mt-6"
              role="group"
              aria-label="Навигация по слайдам">
              <button
                *ngFor="let cup of teaCups; let i = index; trackBy: trackByFn"
                (click)="setSlide(i)"
                class="w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                [class]="currentIndex === i ? 'bg-coral scale-125' : 'bg-gray-300'"
                [attr.aria-label]="'Перейти к слайду ' + cup.name"
                [attr.aria-pressed]="currentIndex === i">
              </button>
            </div>

            <!-- Декоративные элементы -->
            <div
              class="absolute -top-10 -right-10 w-40 h-40 text-coral/10 animate-spin-slow"
              aria-hidden="true">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M50 0A50 50 0 1050 100A50 50 0 1050 0" fill="none" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижний декор -->
      <div
        class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true">
      </div>
    </section>

    <!-- Модальное окно -->
    <app-modal
      *ngIf="isModalOpen"
      (close)="closeModal()">
    </app-modal>
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

    button:focus-visible {
      outline: 2px solid #000;
      outline-offset: 2px;
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private slideInterval: number | undefined;
  private readonly AUTO_SLIDE_INTERVAL = 5000;

  currentIndex = 0;
  isModalOpen = false;

  teaCups: TeaCup[] = [
    {
      id: 'classic',
      image: 'assets/images/classic-tea.svg',
      name: 'Классический чай',
      color: '#FFD700'
    },
    {
      id: 'bubble',
      image: 'assets/images/bubble-tea.svg',
      name: 'Bubble Tea',
      color: '#FF69B4'
    },
    {
      id: 'fruit',
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

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Предотвращаем скролл body
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = ''; // Возвращаем скролл
  }

  private startSlideshow() {
    this.stopSlideshow();

    this.slideInterval = window.setInterval(() => {
      this.nextSlide();
    }, this.AUTO_SLIDE_INTERVAL);
  }

  private stopSlideshow() {
    if (this.slideInterval) {
      window.clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.teaCups.length;
  }

  setSlide(index: number) {
    if (index !== this.currentIndex) {
      this.currentIndex = index;
      this.startSlideshow();
    }
  }

  trackByFn(index: number, item: TeaCup): string {
    return item.id;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/fallback-image.svg';
    imgElement.setAttribute('alt', 'Изображение недоступно');

    console.error(`Ошибка загрузки изображения: ${imgElement.src}`);
  }
}
