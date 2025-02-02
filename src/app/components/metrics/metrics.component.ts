import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

interface MetricItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  icon: string;
  color: string;
}

@Component({
    selector: 'app-metrics',
    imports: [CommonModule, NgOptimizedImage],
    template: `
    <section id="metrics" class="py-20 bg-gray-50 relative overflow-hidden">
      <!-- Декоративный фон -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2">
          <svg class="w-full h-full text-coral/5">
            <use xlink:href="#geo-pattern"></use>
          </svg>
        </div>
        <div class="absolute bottom-0 right-0 w-40 h-40 transform translate-x-1/4 translate-y-1/4">
          <svg class="w-full h-full text-primary/5">
            <use xlink:href="#dots-pattern"></use>
          </svg>
        </div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Заголовок -->
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Успешная бизнес-модель, проверенная годами работы и сотнями довольных клиентов
          </p>
        </div>

        <!-- Метрики -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div *ngFor="let metric of metrics; let i = index"
               class="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-300
                      hover:shadow-xl hover:-translate-y-1"
               [class.animate-metric]="isMetricVisible">
            <div class="flex items-start">
              <!-- Иконка -->
              <div [class]="'w-12 h-12 rounded-lg flex items-center justify-center ' + metric.color">
                <svg class="w-6 h-6 text-white">
                  <use [attr.xlink:href]="'#' + metric.icon"></use>
                </svg>
              </div>

              <!-- Значение и подпись -->
              <div class="ml-4">
                <div class="flex items-baseline">
                  <span *ngIf="metric.prefix" class="text-lg text-gray-500">{{metric.prefix}}</span>
                  <span class="text-3xl font-bold">{{metric.value}}</span>
                  <span *ngIf="metric.suffix" class="text-lg text-gray-500 ml-1">{{metric.suffix}}</span>
                </div>
                <p class="text-gray-600 mt-1">{{metric.label}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Дополнительная информация -->
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <!-- Текстовый блок -->
          <div class="lg:w-1/2">
            <div class="bg-white rounded-xl p-8 shadow-lg">
              <h3 class="text-2xl font-bold mb-4">О бренде TEADAY</h3>
              <p class="text-gray-600 leading-relaxed">
                Более четырёх лет на рынке и преданность оригинальности. Мы завоевали
                доверие клиентов благодаря уникальному меню, в котором каждый найдёт
                что-то для себя. Мы постоянно создаём новые, неповторимые вкусы,
                добавляя в меню свежие напитки, чтобы радовать наших гостей и удивлять
                их каждый раз.
              </p>
              <div class="mt-6">
                <button class="text-coral font-semibold flex items-center group">
                  Узнать больше
                  <svg class="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Изображение -->
          <div class="lg:w-1/2">
            <div class="relative">
              <img ngSrc="/assets/images/team.svg"
                   width="800"
                   height="600"
                   alt="Команда TEADAY"
                   class="w-full h-auto rounded-xl shadow-lg">

              <!-- Декоративный бейдж -->
              <div class="absolute -bottom-6 -right-6 bg-coral text-white px-6 py-3
                          rounded-lg shadow-lg transform rotate-3">
                <div class="text-sm font-semibold">Успешная команда</div>
                <div class="text-xs opacity-75">с 2020 года</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .animate-metric {
      animation: metric-appear 0.6s ease-out forwards;
    }

    @keyframes metric-appear {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .bg-metric-1 { @apply bg-coral; }
    .bg-metric-2 { @apply bg-primary; }
    .bg-metric-3 { @apply bg-green-500; }
  `]
})
export class MetricsComponent implements OnInit {
  isMetricVisible = false;

  metrics: MetricItem[] = [
    {
      value: '20-30',
      suffix: '%',
      label: 'Рентабельность',
      icon: 'stats',
      color: 'bg-metric-1'
    },
    {
      value: '12-18',
      prefix: 'от',
      suffix: 'млн тг/мес',
      label: 'Прогнозируемая выручка',
      icon: 'money',
      color: 'bg-metric-2'
    },
    {
      value: '8-12',
      suffix: 'мес',
      label: 'Срок окупаемости',
      icon: 'time',
      color: 'bg-metric-3'
    }
  ];

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const element = document.getElementById('metrics');
    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isMetricVisible = true;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(element);
    }
  }
}
