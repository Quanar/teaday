import { Component, signal, computed, effect, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroSpeakerWave,
  heroChatBubbleBottomCenter,
  heroUsers,
  heroBookOpen,
  heroBriefcase,
  heroChartBar,
  heroClipboardDocument,
  heroMapPin,
  heroAcademicCap,
  heroUserGroup,
  heroFlag,
  heroSparkles,
  heroArrowRight,
} from '@ng-icons/heroicons/outline';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';
import { FormsModule } from '@angular/forms';

interface Feature {
  icon: string;
  title: string;
  description: string;
  stats?: {
    value: number;
    label: string;
  }[];
}

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  providers: [
    provideIcons({
      heroSpeakerWave,
      heroChatBubbleBottomCenter,
      heroUsers,
      heroBookOpen,
      heroBriefcase,
      heroChartBar,
      heroClipboardDocument,
      heroMapPin,
      heroAcademicCap,
      heroUserGroup,
      heroFlag,
      heroSparkles,
      heroArrowRight,
    })
  ],
  template: `
    <section id="partnership" class="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <!-- Декоративные элементы -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-20 left-10 w-64 h-64 bg-coral opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-40 right-20 w-96 h-96 bg-coral opacity-5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
      </div>

      <div class="container mx-auto px-4">
        <!-- Заголовок с интерактивным эффектом -->
        <div class="text-center mb-16 relative" (mousemove)="onTitleHover($event)" #titleContainer>
          <span class="text-coral text-lg font-semibold tracking-wider uppercase mb-4 block animate-fade-in">
            Партнёрская программа
            <ng-icon name="heroSparkles" class="w-10 h-10 inline-block ml-2 animate-spin-slow"></ng-icon>
          </span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent relative">
            <span class="relative inline-block">
              ПАРТНЕРСТВО С
              <span class="text-coral relative">
                TEADAY
                <div class="absolute -inset-1 bg-coral opacity-20 blur-sm rounded-lg"
                     [style.transform]="getHoverEffect()"></div>
              </span>
            </span>
          </h2>
          <div class="w-24 h-1 bg-coral mx-auto rounded-full mb-8"></div>
        </div>

        <!-- Статистика -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div *ngFor="let stat of statistics()"
               class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-300"
               [@countAnimation]="stat.value">
            <div class="text-3xl font-bold text-coral mb-2">
              {{ stat.value }}{{ stat.suffix }}
            </div>
            <div class="text-gray-600">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Преимущества партнерства -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
             [@staggerFeatures]>
          <div *ngFor="let feature of features(); let i = index"
               class="feature-card group cursor-pointer"
               [@cardHover]="'initial'"
               (mouseenter)="onCardHover($event.target, 'hovered')"
               (mouseleave)="onCardHover($event.target, 'initial')"
               (click)="onFeatureClick(feature)">
            <div class="icon-wrapper mb-6">
              <div class="relative icon-container">
                <div class="absolute inset-0 bg-coral opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div class="icon-animated" [attr.data-index]="i">
                  <ng-icon
                    [name]="feature.icon"
                    class="w-24 h-24 relative z-10 text-coral"
                  ></ng-icon>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-medium mb-3 text-gray-900 text-center">{{feature.title}}</h3>

            <!-- Статистика функции -->
            <div *ngIf="feature.stats" class="mt-4 grid grid-cols-2 gap-4">
              <div *ngFor="let stat of feature.stats"
                   class="text-center p-2 bg-gray-50 rounded-lg">
                <div class="text-xl font-bold text-coral">{{stat.value}}</div>
                <div class="text-sm text-gray-600">{{stat.label}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Этапы партнерства -->
        <div class="partnership-steps bg-white rounded-2xl shadow-lg p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coral via-coral-light to-coral"></div>

          <!-- Progress Bar -->
          <div class="relative h-2 bg-gray-200 rounded-full mb-8">
            <div class="absolute top-0 left-0 h-full bg-coral rounded-full transition-all duration-500"
                 [style.width]="progressWidth + '%'"></div>
          </div>

          <div class="text-center mb-16">
            <h3 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              КАК СТАТЬ ПАРТНЕРОМ
              <span class="text-coral relative">
                TEADAY
                <div class="absolute -inset-1 bg-coral opacity-20 blur-sm rounded-lg"></div>
              </span>
            </h3>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Каждый партнер – это наш союзник. Мы ищем тех, кто разделяет наши ценности,
              готов развиваться вместе с нами и вносить свой вклад в общее дело.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               [@staggerSteps]>
            <div *ngFor="let step of steps(); let i = index"
                 class="step-card group"
                 [class.active]="currentStep() === i"
                 (mouseenter)="setCurrentStep(i)">
              <div class="step-number">
                {{i + 1}}
              </div>
              <h4 class="text-xl font-medium mb-4 text-gray-900 group-hover:text-coral transition-colors duration-300">
                {{step.title}}
              </h4>
              <p class="text-gray-600 leading-relaxed">{{step.description}}</p>

              <!-- Progress indicator -->
              <div class="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-coral transition-all duration-500"
                     [style.width]="(i <= currentStep() ? '100%' : '0%')"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .feature-card {
      @apply bg-white p-8 rounded-xl shadow-sm border border-gray-100;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        @apply shadow-lg border-coral-light;
        transform: translateY(-6px);

        .icon-animated ng-icon {
          animation-duration: 1.5s;
          animation-timing-function: ease-in-out;
        }
      }
    }

    .icon-container {
      @apply p-6 rounded-xl inline-block relative;

      &::after {
        content: '';
        @apply absolute inset-0 bg-coral opacity-0 rounded-full blur-xl;
        transition: all 0.3s ease;
      }
    }

    .feature-card:hover .icon-container::after {
      @apply opacity-20;
      transform: scale(1.4);
    }

    .icon-animated {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        @apply absolute inset-0 bg-coral opacity-10 rounded-full;
        transform: scale(1.2);
        transition: all 0.3s ease;
      }
    }

    .feature-card:hover .icon-animated::before {
      transform: scale(1.4);
      @apply opacity-20;
    }

    .step-card {
      @apply bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-100 relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        @apply shadow-lg border-coral-light;
      }

      .step-number {
        @apply absolute -top-6 -left-6 w-16 h-16 bg-coral rounded-full flex items-center justify-center;
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transform-origin: center;
        transition: all 0.3s ease;
      }

      &:hover .step-number {
        transform: scale(1.1) rotate(10deg);
      }

      &.active {
        @apply border-coral;
        transform: translateY(-4px);

        .step-number {
          @apply bg-coral;
          transform: scale(1.15);
        }
      }
    }

    @keyframes book-flip {
      0% { transform: rotateY(0deg); }
      50% { transform: rotateY(-180deg); }
      100% { transform: rotateY(-360deg); }
    }

    @keyframes chat-bubble {
      0% { transform: scale(1); }
      50% { transform: scale(1.1) translateY(-2px); }
      100% { transform: scale(1); }
    }

    @keyframes support-wave {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
      100% { transform: rotate(0deg); }
    }

    @keyframes team-bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    @keyframes store-shine {
      0% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.05) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes chart-grow {
      0% { transform: scaleY(1); }
      50% { transform: scaleY(1.1); }
      100% { transform: scaleY(1); }
    }

    .feature-card:nth-child(1) .icon-animated ng-icon {
      animation-delay: 0s;
    }
    .feature-card:nth-child(2) .icon-animated ng-icon {
      animation-delay: 0.2s;
    }
    .feature-card:nth-child(3) .icon-animated ng-icon {
      animation-delay: 0.4s;
    }
    .feature-card:nth-child(4) .icon-animated ng-icon {
      animation-delay: 0.6s;
    }
    .feature-card:nth-child(5) .icon-animated ng-icon {
      animation-delay: 0.8s;
    }
    .feature-card:nth-child(6) .icon-animated ng-icon {
      animation-delay: 1s;
    }

    .icon-animated[data-index="0"] ng-icon {
      animation: support-wave 2s ease-in-out infinite;
    }

    .icon-animated[data-index="1"] ng-icon {
      animation: chat-bubble 2s ease-in-out infinite;
    }

    .icon-animated[data-index="2"] ng-icon {
      animation: team-bounce 2s ease-in-out infinite;
    }

    .icon-animated[data-index="3"] ng-icon {
      animation: book-flip 3s ease-in-out infinite;
    }

    .icon-animated[data-index="4"] ng-icon {
      animation: store-shine 2s ease-in-out infinite;
    }

    .icon-animated[data-index="5"] ng-icon {
      animation: chart-grow 2s ease-in-out infinite;
      transform-origin: bottom;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
    }

    .animate-spin-slow {
      animation: spin 3s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `],
  animations: [
    trigger('staggerFeatures', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('150ms', [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('staggerSteps', [
      transition(':enter', [
        query('.step-card', [
          style({ opacity: 0, transform: 'translateX(30px)' }),
          stagger('150ms', [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ]),
    trigger('cardHover', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)'
      })),
      transition('initial <=> hovered', animate('200ms ease-in-out'))
    ]),
    trigger('countAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PartnershipComponent implements AfterViewInit {
  @ViewChild('titleContainer') titleContainer!: ElementRef;

  private mouseX = signal(0);
  private mouseY = signal(0);

  currentStep = signal(0);
  progressWidth = computed(() => (this.currentStep() + 1) * (100 / this.steps().length));

  statistics = signal([
    { value: 150, suffix: '+', label: 'Активных партнеров' },
    { value: 95, suffix: '%', label: 'Успешных запусков' },
    { value: 1.2, suffix: 'M', label: 'Довольных клиентов' },
    { value: 24, suffix: '', label: 'Города присутствия' }
  ]);

  features = signal([
    {
      icon: 'heroSpeakerWave',
      title: 'Полная поддержка партнеров',
      description: 'Круглосуточная поддержка и консультации по всем вопросам',
      stats: [
        { value: 24, label: 'Часа поддержки' },
        { value: 98, label: '% удовлетворенности' }
      ]
    },
    {
      icon: 'heroChatBubbleBottomCenter',
      title: 'Рабочий чат с экспертами',
      description: 'Прямая связь с опытными специалистами',
      stats: [
        { value: 15, label: 'Мин. время ответа' },
        { value: 100, label: '% решенных вопросов' }
      ]
    },
    {
      icon: 'heroUsers',
      title: 'Помощь в поиске команды',
      description: 'Подбор и обучение персонала',
      stats: [
        { value: 500, label: 'Обученных сотрудников' },
        { value: 92, label: '% остаются в сети' }
      ]
    },
    {
      icon: 'heroBookOpen',
      title: 'База знаний',
      description: 'Доступ к полной библиотеке материалов',
      stats: [
        { value: 1000, label: 'Страниц контента' },
        { value: 50, label: 'Видео-уроков' }
      ]
    },
    {
      icon: 'heroBriefcase',
      title: 'Мастер-франшиза',
      description: 'Возможность развития целого региона',
      stats: [
        { value: 5, label: 'Регионов доступно' },
        { value: 200, label: '% Рост прибыли' }
      ]
    },
    {
      icon: 'heroChartBar',
      title: 'Маркетинговая поддержка',
      description: 'Продвижение в социальных сетях',
      stats: [
        { value: 1.5, label: 'млн. охват' },
        { value: 45, label: '% Конверсия' }
      ]
    }
  ]);

  steps = signal([
    {
      title: 'Оставьте заявку',
      description: 'Заполните простую форму и расскажите о своём видении будущего партнерства с TEADAY. Мы свяжемся с вами в течение 24 часов.'
    },
    {
      title: 'Согласование деталей',
      description: 'Обсудим все аспекты сотрудничества, условия партнерства и подготовим индивидуальное предложение для вашего бизнеса.'
    },
    {
      title: 'Выбор локации',
      description: 'Проведем анализ рынка и поможем выбрать оптимальное местоположение для вашей точки с учетом всех факторов успеха.'
    },
    {
      title: 'Обучение и подготовка',
      description: 'Проведем комплексное обучение по всем аспектам бизнеса: от приготовления напитков до управления финансами.'
    },
    {
      title: 'Формирование команды',
      description: 'Поможем собрать профессиональную команду, проведем обучение персонала и настроим все рабочие процессы.'
    },
    {
      title: 'Торжественное открытие',
      description: 'Организуем яркое открытие вашей точки с привлечением местных СМИ и запуском маркетинговой кампании.'
    }
  ]);

  constructor() {
    effect(() => {
      const timer = setInterval(() => {
        this.setCurrentStep((this.currentStep() + 1) % this.steps().length);
      }, 3000);

      return () => clearInterval(timer);
    });
  }

  ngAfterViewInit() {
    // Инициализация после рендеринга
  }

  getHoverEffect(): string {
    const x = this.mouseX();
    const y = this.mouseY();
    return `translate3d(${x}px, ${y}px, 0) scale(1.1)`;
  }

  onTitleHover(event: MouseEvent) {
    const rect = this.titleContainer.nativeElement.getBoundingClientRect();
    this.mouseX.set((event.clientX - rect.left) / 10);
    this.mouseY.set((event.clientY - rect.top) / 10);
  }

  setCurrentStep(index: number) {
    this.currentStep.set(index);
  }

  onFeatureClick(feature: Feature) {
    console.log('Feature clicked:', feature);
  }

  onCardHover(target: any, state: 'initial' | 'hovered') {
    target.setAttribute('data-state', state);
  }
}
