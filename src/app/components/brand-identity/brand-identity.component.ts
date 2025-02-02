import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";

@Component({
  selector: 'app-brand-identity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <!-- Заголовок -->
        <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">
          Айдентика бренда
        </h2>

        <!-- Картинки -->
        <div class="grid gap-12">
          <!-- Первая строка: две картинки -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="flex flex-col">
              <div class="w-full overflow-hidden rounded-lg shadow-lg">
                <img [src]="image1" alt="Brand Identity 1" class="w-full h-auto object-contain">
              </div>
              <p class="mt-6 text-lg text-gray-600">
                Фирменный знак имеет четкие контуры и читаемый шрифт, что позволяет его легко распознавать на любом носителе.
              </p>
            </div>
            <div class="flex flex-col">
              <div class="w-full overflow-hidden rounded-lg shadow-lg">
                <img [src]="image2" alt="Brand Identity 2" class="w-full h-auto object-contain">
              </div>
              <p class="mt-6 text-lg text-gray-600">
                Отличный фирменный знак! Буква "0" в виде солнца и капля, а также перевернутая на 80 градусов буква "D" в виде чашки кофе.
              </p>
            </div>
          </div>

          <!-- Вторая строка: две картинки -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="flex flex-col">
              <div class="w-full overflow-hidden rounded-lg shadow-lg">
                <img [src]="image3" alt="Brand Identity 3" class="w-full h-auto object-contain">
              </div>
              <p class="mt-6 text-lg text-gray-600">
                Этот знак мгновенно привлекает внимание и запоминается благодаря своей оригинальности и яркости!
              </p>
            </div>
            <div class="flex flex-col">
              <div class="w-full overflow-hidden rounded-lg shadow-lg">
                <img [src]="image4" alt="Brand Identity 4" class="w-full h-auto object-contain">
              </div>
              <p class="mt-6 text-lg text-gray-600">
                Еще один пример фирменного стиля, который подчеркивает уникальность бренда.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Дополнительные стили не требуются, всё сделано с помощью Tailwind */
  `]
})
export class BrandIdentityComponent {
  // Замени эти пути на свои изображения
  image1 = 'assets/images/2log.jpeg';
  image2 = 'assets/images/Lut.jpeg';
  image3 = 'assets/images/oneto2.jpeg';
  image4 = 'assets/images/teaday.png';
}
