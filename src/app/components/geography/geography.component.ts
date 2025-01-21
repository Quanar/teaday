import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-geography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">
          МЕЖДУНАРОДНОЕ РАЗВИТИЕ<br>
          <span class="text-coral">TEADAY</span>
        </h2>

        <div class="flex flex-col lg:flex-row items-center gap-12">
          <!-- Карта -->
          <div class="lg:w-2/3" [@fadeIn]>
            <div class="relative">
              <img
                src="assets/images/world-map.svg"
                alt="Карта присутствия TEADAY"
                class="w-full"
              >
              <!-- Точки на карте -->
              <div *ngFor="let location of locations()"
                   class="map-point"
                   [style.left]="location.x + '%'"
                   [style.top]="location.y + '%'">
              </div>
            </div>
          </div>

          <!-- Информация -->
          <div class="lg:w-1/3" [@slideIn]>
            <p class="text-lg mb-8">
              Бренд TEADAY планирует активное расширение не только в Казахстане.
              Мы видим значительные возможности для роста и готовы к выходу на новые рынки.
              Если вы заинтересованы в продвижении TEADAY в своей стране, свяжитесь с нами.
              Мы открыты к сотрудничеству с амбициозными и надежными партнерами по всему миру.
            </p>

            <div class="locations">
              <h3 class="font-bold mb-4">Наши точки:</h3>
              <ul class="space-y-2">
                <li *ngFor="let city of cities()">
                  <span class="font-medium">{{city.name}}</span> — {{city.count}} точки
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .map-point {
      @apply w-3 h-3 bg-coral rounded-full absolute;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 87, 51, 0.7);
      }
      70% {
        transform: scale(1.3);
        box-shadow: 0 0 0 10px rgba(255, 87, 51, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 87, 51, 0);
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class GeographyComponent {
  locations = signal([
    { x: 30, y: 25 }, // Астана
    { x: 28, y: 30 }, // Алматы
    { x: 25, y: 20 }, // Казань
    { x: 22, y: 22 }  // Уфа
  ]);

  cities = signal([
    { name: 'Астана', count: 4 },
    { name: 'Алматы', count: 4 },
    { name: 'Казань', count: 2 },
    { name: 'Уфа', count: 2 }
  ]);
}
