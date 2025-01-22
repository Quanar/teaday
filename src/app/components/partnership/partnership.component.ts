import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="partnership" class="py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <span class="text-coral text-lg font-semibold tracking-wider uppercase mb-4 block animate-fade-in">
            Партнёрская программа
          </span>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            ПАРТНЕРСТВО С <span class="text-coral">TEADAY</span>
          </h2>
          <div class="w-24 h-1 bg-coral mx-auto rounded-full mb-8"></div>
        </div>

        <!-- Преимущества партнерства -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
             [@staggerFeatures]>
          <div *ngFor="let feature of features()"
               class="feature-card group"
               [@cardHover]="'initial'">
            <div class="icon-wrapper mb-6 group-hover:scale-110 transition-transform duration-300">
              <div class="relative">
                <div class="absolute inset-0 bg-coral opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity"></div>
                <img [src]="feature.icon" [alt]="feature.title" class="w-16 h-16 relative z-10">
              </div>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">{{feature.title}}</h3>
            <p class="text-gray-600 leading-relaxed">{{feature.description}}</p>
          </div>
        </div>

        <!-- Этапы партнерства -->
        <div class="partnership-steps bg-white rounded-2xl shadow-lg p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coral via-coral-light to-coral"></div>

          <div class="text-center mb-16">
            <h3 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              КАК СТАТЬ ПАРТНЕРОМ <span class="text-coral">TEADAY</span>
            </h3>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Каждый партнер – это наш союзник. Мы ищем тех, кто разделяет наши ценности,
              готов развиваться вместе с нами и вносить свой вклад в общее дело.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               [@staggerSteps]>
            <div *ngFor="let step of steps()"
                 class="step-card group">
              <div class="step-icon">
                <div class="icon-animate">
                  <img [src]="step.icon" [alt]="step.title"
                       class="w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
                  <div class="absolute inset-0 bg-coral opacity-20 rounded-full blur-md
                              group-hover:blur-lg group-hover:scale-110 transition-all duration-300"></div>
                </div>
              </div>
              <h4 class="text-2xl font-bold mb-4 text-gray-900 group-hover:text-coral transition-colors duration-300">
                {{step.title}}
              </h4>
              <p class="text-gray-600 leading-relaxed">{{step.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .feature-card {
      @apply bg-white p-8 rounded-2xl shadow-sm border border-gray-100;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        @apply shadow-xl border-coral-light;
        transform: translateY(-8px);
      }

      .icon-wrapper {
        @apply p-4 rounded-2xl inline-block;
      }
    }

    .step-card {
      @apply bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        @apply shadow-lg border-coral-light;
      }

      .step-icon {
        @apply absolute -top-6 -left-6;

        .icon-animate {
          @apply w-16 h-16 bg-coral rounded-full flex items-center justify-center relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

          img {
            @apply relative z-10;
          }
        }
      }
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
    ])
  ]
})
export class PartnershipComponent {
  features = signal([
    {
      icon: 'assets/icons/support.svg',
      title: 'Полная поддержка партнеров',
      description: 'Предоставляем комплексную поддержку на всех этапах развития вашего бизнеса. Наши эксперты всегда готовы помочь с любыми вопросами.'
    },
    {
      icon: 'assets/icons/chat.svg',
      title: 'Рабочий чат',
      description: 'Эксклюзивный доступ к корпоративному чату, где вы можете обмениваться опытом с другими партнерами и получать оперативные ответы на все вопросы.'
    },
    {
      icon: 'assets/icons/team.svg',
      title: 'Помощь в поиске команды',
      description: 'Предоставляем полное руководство по подбору персонала и проводим профессиональное обучение вашей команды по корпоративным стандартам.'
    },
    {
      icon: 'assets/icons/knowledge.svg',
      title: 'База знаний',
      description: 'Доступ к обширной базе знаний с подробными инструкциями, стандартами работы и лучшими практиками ведения бизнеса в чайной индустрии.'
    },
    {
      icon: 'assets/icons/franchise.svg',
      title: 'Возможность приобретения',
      description: 'Эксклюзивное право на развитие мастер-франшизы в вашем регионе с расширенными возможностями и правами на сублицензирование.'
    },
    {
      icon: 'assets/icons/marketing.svg',
      title: 'Мощное маркетинговое продвижение',
      description: 'Профессиональная маркетинговая поддержка, включая SMM, таргетированную рекламу и доступ к готовым рекламным материалам.'
    }
  ]);

  steps = signal([
    {
      icon: 'assets/icons/form.svg',
      title: 'Оставьте заявку',
      description: 'Заполните простую форму и расскажите о своём видении будущего партнерства с TeaDay. Мы свяжемся с вами в течение 24 часов.'
    },
    {
      icon: 'assets/icons/handshake.svg',
      title: 'Согласование деталей',
      description: 'Обсудим все аспекты сотрудничества, условия партнерства и подготовим индивидуальное предложение для вашего бизнеса.'
    },
    {
      icon: 'assets/icons/location.svg',
      title: 'Выбор локации',
      description: 'Проведем анализ рынка и поможем выбрать оптимальное местоположение для вашей точки с учетом всех факторов успеха.'
    },
    {
      icon: 'assets/icons/education.svg',
      title: 'Обучение и подготовка',
      description: 'Проведем комплексное обучение по всем аспектам бизнеса: от приготовления напитков до управления финансами.'
    },
    {
      icon: 'assets/icons/team-build.svg',
      title: 'Формирование команды',
      description: 'Поможем собрать профессиональную команду, проведем обучение персонала и настроим все рабочие процессы.'
    },
    {
      icon: 'assets/icons/celebration.svg',
      title: 'Торжественное открытие',
      description: 'Организуем яркое открытие вашей точки с привлечением местных СМИ и запуском маркетинговой кампании.'
    }
  ]);
}
