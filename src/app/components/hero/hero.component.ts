import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from "../../services/scroll.service";
import { ModalComponent } from "../modal/modal.component";
import {
  trigger,
  transition,
  style,
  animate,
  state,
  query,
  stagger,
  group
} from '@angular/animations';
import {RouterLink} from "@angular/router";

interface TeaCup {
  image: string;
  name: string;
  color: string;
  id: string;
  description: string;
  price: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ModalComponent, RouterLink],
  animations: [
    trigger('slideAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.9) translateY(20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('void => *', animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')),
      transition('* => void', animate('400ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ]),
    trigger('staggerList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeSlide', [
      transition(':increment, :decrement', [
        group([
          query(':enter', [
            style({ opacity: 0, transform: '{{enterTransform}}' }),
            animate('600ms ease-out',
              style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }),
            animate('600ms ease-out',
              style({ opacity: 0, transform: '{{leaveTransform}}' }))
          ], { optional: true })
        ])
      ])
    ])
  ],
  template: `
    <section
      class="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 pb-2"
      role="banner"
      aria-label="Главный баннер">

      <!-- Фоновые элементы -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-1/2 -right-1/4 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px]
                    bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-1/2 -left-1/4 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px]
                    bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <!-- Основной контент -->
      <div class="container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-6 md:py-8 lg:py-12 relative">
        <div class="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">

          <!-- Левая часть -->
          <div class="flex flex-col items-center md:items-start space-y-4 sm:space-y-6 md:space-y-8 relative z-20"
               @slideAnimation>
            <!-- Плашка франшизы -->
            <div class="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-100 rounded-full text-blue-600
                      text-xs sm:text-sm font-medium">
              Франшиза TeaDay
            </div>

            <!-- Заголовок -->
            <h1 class="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-center md:text-left
                       bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent w-full">
              СТАНЬ ПАРТНЕРОМ
              <div class="relative mt-2 sm:mt-4 mb-4 sm:mb-6">
                <img
                  src="assets/images/teaday.png"
                  alt="TeaDay Logo"
                  class="h-10 xs:h-12 sm:h-16 lg:h-24 object-contain mx-auto md:mx-0"
                  loading="lazy"
                  (error)="handleImageError($event)"
                />
                <div
                  class="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 bg-yellow-400 rounded-full p-1.5 sm:p-2 animate-bounce">
                  <span class="text-xs sm:text-sm font-bold">NEW</span>
                </div>
              </div>
              и зарабатывай от 20 000 000 тг в год
            </h1>

            <p
              class="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg text-center md:text-left mx-auto md:mx-0">
              <span class="text-coral">Teaday</span> - это идея лёгкости, бодрости и удовольствия от ежедневного
              чаепития.
              <span class="text-coral">Teaday</span> звучит как «день чая», ассоциируясь с приятным моментом в любое время суток.
            </p>

            <!-- Кнопки -->
            <div class="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center md:justify-start w-full">
              <button
                class="group relative px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-blue-600 text-white
                       rounded-xl font-semibold text-sm xs:text-base sm:text-lg w-full xs:w-auto
                       overflow-hidden transition-all duration-300 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <a href="#contacts">
                <span class="relative z-10 flex items-center justify-center">
                  Хочу стать партнером по франшизе
                </span>
                </a>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </button>
            </div>
          </div>

          <!-- Правая часть -->
          <div class="relative z-10 mt-6 md:mt-0" @slideAnimation>
            <!-- 3D Карусель -->
            <div class="relative h-[250px] xs:h-[300px] sm:h-[400px] lg:h-[500px] perspective-1000">
              <div
                *ngFor="let cup of teaCups(); let i = index; trackBy: trackByFn"
                class="absolute w-full h-full transition-all duration-700 preserve-3d"
                [class.opacity-0]="currentIndex() !== i"
                [style.transform]="getSlideTransform(i)">

                <div class="relative group cursor-pointer" (click)="showCupDetails(cup)">
                  <img
                    [src]="cup.image"
                    [alt]="cup.name"
                    class="w-full h-full object-contain transform transition-transform
                           group-hover:scale-105 drop-shadow-2xl"
                    loading="lazy"
                    (error)="handleImageError($event)">

                  <!-- Информационная карточка -->
                  <div class="hidden sm:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-full max-w-md
                              bg-white/90 backdrop-blur-md rounded-2xl p-3 xs:p-4 sm:p-6 opacity-0
                              group-hover:opacity-100 transition-all duration-300
                              translate-y-4 group-hover:translate-y-0">
                    <h3 class="text-base xs:text-lg sm:text-xl font-bold mb-1 sm:mb-2">{{ cup.name }}</h3>
                    <p class="text-xs xs:text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">{{ cup.description }}</p>
                    <div class="flex justify-between items-center">
                      <span class="text-blue-600 font-bold text-sm xs:text-base">{{ cup.price }}</span>
                      <button class="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-blue-600 text-white
                                   text-xs xs:text-sm sm:text-base rounded-lg
                                   hover:bg-blue-700 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>

                  <!-- Мобильная информационная карточка -->
                  <div class="sm:hidden mt-4 bg-white/90 backdrop-blur-md rounded-xl p-3 text-center">
                    <h3 class="text-base font-bold">{{ cup.name }}</h3>
                    <p class="text-xs text-gray-600 mt-1">{{ cup.description }}</p>
                  </div>

                  <!-- Цветовой акцент -->
                  <div
                    class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           w-48 xs:w-64 sm:w-96 h-48 xs:h-64 sm:h-96 rounded-full blur-3xl opacity-20
                           transition-all duration-300 group-hover:opacity-30
                           group-hover:w-[250px] xs:group-hover:w-[300px] sm:group-hover:w-[400px]"
                    [style.background-color]="cup.color">
                  </div>
                </div>
              </div>
            </div>

            <!-- Навигация карусели -->
            <div class="flex justify-center gap-2 xs:gap-3 sm:gap-4 mt-4 sm:mt-6">
              <button
                *ngFor="let cup of teaCups(); let i = index; trackBy: trackByFn"
                (click)="setSlide(i)"
                (mouseenter)="pauseSlideshow()"
                (mouseleave)="resumeSlideshow()"
                class="group relative w-1.5 xs:w-2 sm:w-3 h-1.5 xs:h-2 sm:h-3 focus:outline-none"
                [attr.aria-label]="'Перейти к слайду ' + cup.name"
                [attr.aria-pressed]="currentIndex() === i">
                <span class="absolute inset-0 rounded-full bg-gray-300
                            transition-all duration-300 group-hover:scale-150"
                      [class.bg-blue-600]="currentIndex() === i"></span>
              </button>
            </div>

            <!-- Декоративные элементы -->
            <div class="absolute -top-8 -right-8 sm:-top-10 sm:-right-10
                        w-24 xs:w-28 sm:w-32 lg:w-40 h-24 xs:h-28 sm:h-32 lg:h-40
                        text-blue-400/10 animate-spin-slow"
                 aria-hidden="true">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M50 0A50 50 0 1050 100A50 50 0 1050 0" fill="none" stroke="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Модальное окно -->
    <app-modal
      *ngIf="isModalOpen()"
      (close)="closeModal()">
    </app-modal>
  `,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
    }

    .preserve-3d {
      transform-style: preserve-3d;
    }

    :host {
      display: block;
      position: relative;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

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

    .statistics-item {
      opacity: 0;
      transform: translateY(20px);
    }

    .statistics-item.visible {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private slideInterval: number | undefined;
  private readonly AUTO_SLIDE_INTERVAL = 6000;
  private intersectionObserver: IntersectionObserver;

  // Сигналы для реактивности
  currentIndex = signal(0);
  isModalOpen = signal(false);
  isPaused = signal(false);
  slideDirection = signal<'next' | 'prev'>('next');

  // Данные о чае
  teaCups = signal<TeaCup[]>([
    {
      id: 'classic',
      image: 'assets/images/classic-tea.svg',
      name: 'Классический чай',
      color: '#FFD700',
      description: 'Изысканный купаж черного чая с богатым ароматом и насыщенным вкусом',
      price: ''
    },
    {
      id: 'bubble',
      image: 'assets/images/bubble-tea.svg',
      name: 'Bubble Tea',
      color: '#FF69B4',
      description: 'Популярный молочный чай с жемчужинами тапиоки и фруктовыми добавками',
      price: ''
    },
    {
      id: 'fruit',
      image: 'assets/images/fruit-tea.svg',
      name: 'Фруктовый чай',
      color: '#FF6B6B',
      description: 'Освежающий микс из натуральных фруктов и ягод с нежным цветочным ароматом',
      price: ''
    }
  ]);

  // Вычисляемые значения
  activeSlide = computed(() => this.teaCups()[this.currentIndex()]);
  slideAnimationParams = computed(() => {
    const direction = this.slideDirection();
    return {
      enterTransform: direction === 'next' ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
      leaveTransform: direction === 'next' ? 'translate3d(-100%, 0, 0)' : 'translate3d(100%, 0, 0)'
    };
  });

  constructor() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  }

  ngOnInit() {
    this.initializeAnimations();
    this.startSlideshow();
  }

  ngOnDestroy() {
    this.stopSlideshow();
    this.intersectionObserver.disconnect();
  }

  private initializeAnimations() {
    const statisticsItems = document.querySelectorAll('.statistics-item');
    statisticsItems.forEach(item => {
      this.intersectionObserver.observe(item);
    });
  }

  getSlideTransform(index: number): string {
    const current = this.currentIndex();
    if (index === current) {
      return 'translateZ(0) rotateY(0)';
    }
    const diff = index - current;
    const rotation = diff * 45;
    const translate = diff * 100;
    return `translateX(${translate}%) translateZ(-200px) rotateY(${rotation}deg)`;
  }

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = '';
  }

  showCupDetails(cup: TeaCup) {
    console.log('Показываем детали:', cup);
  }

  private startSlideshow() {
    this.stopSlideshow();

    if (!this.isPaused()) {
      this.slideInterval = window.setInterval(() => {
        this.nextSlide();
      }, this.AUTO_SLIDE_INTERVAL);
    }
  }

  private stopSlideshow() {
    if (this.slideInterval) {
      window.clearInterval(this.slideInterval);
      this.slideInterval = undefined;
    }
  }

  nextSlide() {
    this.slideDirection.set('next');
    this.currentIndex.update(current => (current + 1) % this.teaCups().length);
  }

  previousSlide() {
    this.slideDirection.set('prev');
    this.currentIndex.update(current => {
      const newIndex = current - 1;
      return newIndex < 0 ? this.teaCups().length - 1 : newIndex;
    });
  }

  setSlide(index: number) {
    if (index !== this.currentIndex()) {
      this.slideDirection.set(index > this.currentIndex() ? 'next' : 'prev');
      this.currentIndex.set(index);
    }
  }

  pauseSlideshow() {
    this.isPaused.set(true);
  }

  resumeSlideshow() {
    this.isPaused.set(false);
  }

  trackByFn(_: number, item: TeaCup): string {
    return item.id;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/fallback-image.svg';
    imgElement.setAttribute('alt', 'Изображение недоступно');
    console.error(`Ошибка загрузки изображения: ${imgElement.src}`);
  }
}
