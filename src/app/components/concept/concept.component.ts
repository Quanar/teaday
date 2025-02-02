import {Component, signal, ChangeDetectionStrategy, Signal, HostListener, ElementRef, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query, state } from '@angular/animations';
import { CONCEPT_ITEMS, ConceptItem } from './concept.data';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import {
  faFingerprint,
  faLeaf,
  faLightbulb,
  faStar,
  faStore,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-concept',
    imports: [CommonModule, FaIconComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section
      id="concept"
      class="relative py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      role="region"
      aria-labelledby="concept-title">

      <!-- Декоративные элементы с параллакс-эффектом -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -left-10 top-10 w-40 h-40 bg-coral/10 rounded-full blur-3xl transition-transform duration-300"
          [style.transform]="'translate3d(' + parallaxX(20) + 'px, ' + parallaxY(30) + 'px, 0)'">
        </div>
        <div
          class="absolute right-0 bottom-0 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl transition-transform duration-300"
          [style.transform]="'translate3d(' + parallaxX(-25) + 'px, ' + parallaxY(-35) + 'px, 0)'">
        </div>
        <div
          class="absolute left-1/2 top-1/4 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl transition-transform duration-300"
          [style.transform]="'translate3d(' + parallaxX(15) + 'px, ' + parallaxY(25) + 'px, 0)'">
        </div>
      </div>

      <div class="container relative mx-auto px-4">
        <!-- Заголовок с декоративным подчеркиванием -->
        <div class="text-center mb-16">
          <h2
            id="concept-title"
            class="inline-block text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-coral to-teal-600"
            [@glowText]="'in'">
            КОНЦЕПЦИЯ
          </h2>
          <div class="w-24 h-1 mx-auto bg-gradient-to-r from-coral to-teal-600 rounded-full"></div>
        </div>

        <!-- Основной текст с эффектом появления -->
        <div
          class="text-center max-w-3xl mx-auto mb-20"
          [@fadeIn]
          role="presentation">
          <p class="text-lg leading-relaxed text-gray-700">
            <span class="font-bold text-coral">TEADAY</span> — это больше, чем просто место, где можно купить напиток.
            Это уникальная атмосфера, объединяющая современный стиль, яркие вкусы
            и инновационные подходы к традиционным напиткам. Мы стремимся создавать
            пространство, где каждый гость чувствует себя частью чего-то особенного.
          </p>
        </div>

        <!-- Круговая композиция -->
        <div class="relative max-w-5xl mx-auto">
          <!-- Центральный логотип с пульсацией и параллаксом -->
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300"
            [style.transform]="'translate3d(' +
            'calc(-50% + ' + parallaxX(-10) + 'px), ' +
            'calc(-50% + ' + parallaxY(-10) + 'px), 0)'"
            role="img"
            aria-label="Логотип TEADAY">
            <div class="relative">
              <div class="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full"></div>
              <img
                [src]="logoPath"
                alt="TEADAY"
                class="relative w-32 h-32 object-contain p-4"
                (error)="handleImageError($event)"
                [class.hidden]="isLogoError()"
                [@pulse]="'in'">
              <div
                *ngIf="isLogoError()"
                class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold">
                TEADAY
              </div>
            </div>
            <!-- Пульсирующие круги -->
            <div class="absolute inset-0 -z-10">
              <div class="absolute inset-0 animate-ping-slow bg-coral/20 rounded-full"></div>
              <div class="absolute inset-0 animate-ping-slower bg-teal-500/20 rounded-full"></div>
            </div>
          </div>

          <!-- Преимущества в сетке с hover-эффектами -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            [@staggerFade]
            role="list">
            <div
              *ngFor="let item of conceptItems(); let i = index"
              class="concept-item group"
              role="listitem"
              [attr.aria-posinset]="i + 1"
              [attr.aria-setsize]="conceptItems().length"
              (mouseenter)="onItemHover(i)"
              [@itemHover]="hoveredIndex() === i ? 'hovered' : 'idle'">
              <div class="relative z-10">
                <div class="mb-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center text-white mb-2 transform group-hover:scale-110 transition-transform">
                    <fa-icon
                      [icon]="getIcon(i)"
                      class="text-xl">
                    </fa-icon>
                  </div>
                </div>
                <h3 class="font-bold text-xl mb-3 group-hover:text-coral transition-colors">{{ item.title }}</h3>
                <p class="text-gray-600 group-hover:text-gray-700 transition-colors">{{ item.description }}</p>
              </div>
              <div class="absolute inset-0 bg-gradient-to-br from-coral/5 to-coral-dark/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    :host {
      display: block;
      --parallax-strength: 1;
    }

    .concept-item {
      @apply relative bg-white p-8 rounded-lg shadow-sm transition-all duration-300;
      @apply hover:shadow-xl hover:-translate-y-1;
    }

    .animate-ping-slow {
      animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .animate-ping-slower {
      animation: ping 4s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    :host {
      display: block;
    }
  `],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('800ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('staggerFade', [
            transition(':enter', [
                query('.concept-item', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger('150ms', [
                        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ])
            ])
        ]),
        trigger('pulse', [
            state('in', style({})),
            transition('void => in', [
                style({ transform: 'scale(0.8)', opacity: 0 }),
                animate('1000ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ])
        ]),
        trigger('glowText', [
            state('in', style({})),
            transition('void => in', [
                style({ opacity: 0, filter: 'blur(8px)' }),
                animate('1200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, filter: 'blur(0)' }))
            ])
        ]),
        trigger('itemHover', [
            state('idle', style({})),
            state('hovered', style({
                transform: 'scale(1.02)'
            })),
            transition('idle <=> hovered', animate('200ms ease-out'))
        ])
    ]
})
export class ConceptComponent {
  private elementRef = inject(ElementRef);
  logoPath = 'assets/images/teaday.png';
  isLogoError = signal(false);
  conceptItems: Signal<ConceptItem[]> = signal(CONCEPT_ITEMS);
  hoveredIndex = signal<number | null>(null);

  private scrollPosition = signal({ x: 0, y: 0 });
  private mousePosition = signal({ x: 0, y: 0 });
  private sectionRect = signal<DOMRect | null>(null);

  private readonly icons = [
    faFingerprint,  // Индивидуальность
    faLeaf,         // Яркие вкусы
    faLightbulb,    // Инновации
    faStore,        // Доступность
    faUsers,        // Пространство
    faStar          // Миссия
  ];

  ngOnInit() {
    this.updateSectionRect();
  }

  // Обновление размеров секции
  private updateSectionRect(): void {
    const element = this.elementRef.nativeElement.querySelector('#concept');
    if (element) {
      this.sectionRect.set(element.getBoundingClientRect());
    }
  }

  handleImageError(event: ErrorEvent): void {
    this.isLogoError.set(true);
    console.error('Failed to load logo:', event);
  }

  onItemHover(index: number): void {
    this.hoveredIndex.set(index);
  }

  getIcon(index: number) {
    return this.icons[index] || faStar;
  }

  // Обработчик скролла
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollPosition.set({
      x: window.pageXOffset,
      y: window.pageYOffset
    });
    this.updateSectionRect();
  }

  // Обработчик движения мыши
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.sectionRect();
    if (!rect) return;

    // Нормализуем позицию мыши относительно центра секции
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    this.mousePosition.set({ x, y });
  }

  // Вычисление параллакса по X
  parallaxX(strength: number = 1): number {
    const mouse = this.mousePosition();
    return -mouse.x * strength;
  }

  // Вычисление параллакса по Y
  parallaxY(strength: number = 1): number {
    const mouse = this.mousePosition();
    return -mouse.y * strength;
  }
}
