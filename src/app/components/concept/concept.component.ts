import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-concept',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>CONCEPT-COMPONENT</h1>
    <section id="concept" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">КОНЦЕПЦИЯ</h2>

        <div class="text-center max-w-3xl mx-auto mb-16" [@fadeIn]>
          <p class="text-lg">
            TEADAY — это больше, чем просто место, где можно купить напиток.
            Это уникальная атмосфера, объединяющая современный стиль, яркие вкусы
            и инновационные подходы к традиционным напиткам. Мы стремимся создавать
            пространство, где каждый гость чувствует себя частью чего-то особенного.
          </p>
        </div>

        <!-- Круговая диаграмма с преимуществами -->
        <div class="relative max-w-4xl mx-auto">
          <!-- Центральный логотип -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="assets/images/teaday.png" alt="TEADAY" class="w-24">
          </div>

          <!-- Преимущества по кругу -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" [@staggerFade]>
            <div *ngFor="let item of conceptItems()" class="concept-item">
              <h3 class="font-bold text-xl mb-3">{{item.title}}</h3>
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .concept-item {
      @apply bg-white p-6 rounded-lg shadow-sm transition-transform hover:transform hover:-translate-y-1;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFade', [
      transition(':enter', [
        query('.concept-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class ConceptComponent {
  conceptItems = signal([
    {
      title: 'Индивидуальность бренда',
      description: 'Каждый аспект — от дизайна интерьера до подачи напитков — подчеркивает наш уникальный стиль и создает запоминающийся образ.'
    },
    {
      title: 'Яркие вкусы и свежесть',
      description: 'Мы предлагаем напитки, приготовленные из качественных ингредиентов, которые подчеркивают свежесть и разнообразие вкусов.'
    },
    {
      title: 'Инновации в классике',
      description: 'Мы соединяем традиции и современные тренды, предлагая классический чай с уникальными добавками.'
    },
    {
      title: 'Доступность для всех',
      description: 'Наши форматы кафе, островков и киосков позволяют нам быть ближе к нашим клиентам, независимо от их ритма жизни.'
    },
    {
      title: 'Пространство для общения',
      description: 'Мы создаем не просто место для покупки напитков, но и пространство для встреч, общения и отдыха.'
    },
    {
      title: 'Наша миссия',
      description: 'Не только утолить жажду, но и подарить клиентам незабываемые эмоции через вкус, атмосферу и высококлассное обслуживание.'
    }
  ]);
}
