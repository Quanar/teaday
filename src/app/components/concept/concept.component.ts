import { Component, signal, ChangeDetectionStrategy, Signal, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query, state } from '@angular/animations';
import { CONCEPT_ITEMS, ConceptItem } from './concept.data';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-concept',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="concept"
      class="relative py-6 sm:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
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
        <div class="text-center mb-12">
          <h2
            id="concept-title"
            class="inline-block text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-coral to-teal-600"
            [@glowText]="'in'">
            КОНЦЕПЦИЯ
          </h2>
          <div class="w-24 h-1 mx-auto bg-gradient-to-r from-coral to-teal-600 rounded-full"></div>
        </div>

        <!-- Основной текст с эффектом появления -->
        <div
          class="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          [@fadeIn]
          role="presentation">
          <p class="text-base sm:text-lg lg:text-2xl leading-relaxed text-gray-700">
            буква «<span class="font-bold text-coral">É</span>» с трубочкой, символизирующая свежий взгляд на привычные
            чайные традиции и современный подход к напиткам
          </p>
        </div>

        <!-- Позиционирование -->
        <div class="max-w-4xl mx-auto mb-8">
          <h3 class="text-base sm:text-lg lg:text-xl font-medium mb-6 text-coral">
            Позиционирование
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <!-- Дружелюбный -->
            <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <span class="text-coral mr-2">-</span>
                <p class="text-xs sm:text-sm lg:text-lg text-gray-600">
                  <span class="font-medium text-yellow-500">Дружелюбный:</span>
                  Коммуникация строится на простоте, тёплом общении и создании уютной атмосферы.
                </p>
              </div>
            </div>

            <!-- Игривый -->
            <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <span class="text-coral mr-2">-</span>
                <p class="text-xs sm:text-sm lg:text-lg text-gray-600">
                  <span class="font-medium text-purple-500">Игривый:</span>
                  Легкий юмор, интересные акценты и позитивное настроение помогают бренду быть ближе к аудитории.
                </p>
              </div>
            </div>

            <!-- Современный -->
            <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <span class="text-coral mr-2">-</span>
                <p class="text-xs sm:text-sm lg:text-lg text-gray-600">
                  <span class="font-medium text-blue-500">Современный:</span>
                  Язык, которым говорит бренд, отражает текущие тренды, но сохраняет доступность для всех возрастов.
                </p>
              </div>
            </div>

            <!-- Энергичный -->
            <div class="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <span class="text-coral mr-2">-</span>
                <p class="text-xs sm:text-sm lg:text-lg text-gray-600">
                  <span class="font-medium text-red-500">Энергичный:</span>
                  Призывы к действию и яркие сообщения вдохновляют аудиторию наслаждаться каждым моментом вместе с TeaDay.
                </p>
              </div>
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

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        query('.concept-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('150ms', [
            animate('600ms cubic-bezier(0.4, 0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('pulse', [
      state('in', style({})),
      transition('void => in', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('1000ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('glowText', [
      state('in', style({})),
      transition('void => in', [
        style({ opacity: 0, filter: 'blur(8px)' }),
        animate('1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, filter: 'blur(0)' }))
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
  conceptItems: Signal<ConceptItem[]> = signal(CONCEPT_ITEMS);
  hoveredIndex = signal<number | null>(null);

  private scrollPosition = signal({ x: 0, y: 0 });
  private mousePosition = signal({ x: 0, y: 0 });
  private sectionRect = signal<DOMRect | null>(null);

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
