import {CommonModule} from "@angular/common";
import {Component} from "@angular/core";
import {trigger, transition, style, animate, stagger, query} from '@angular/animations';

@Component({
  selector: 'app-brand-identity',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <section class="py-20 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <!-- Заголовок -->
        <h2 class="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Айдентика бренда
        </h2>
        <p class="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Уникальный визуальный язык, который отражает характер и ценности нашего бренда
        </p>

        <!-- Основные элементы бренда -->
        <div class="grid grid-cols-2 gap-8 mb-16" @staggerAnimation>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <div class="bg-white rounded-2xl shadow-xl h-[300px]">
              <img [src]="image1" alt="Логотип" class="w-full h-full object-cover rounded-2xl">
            </div>
            <div class="mt-4">
              <h3 class="text-xl font-bold mb-3 text-gray-800">Основной логотип</h3>
              <p class="text-gray-600">Фирменный знак с четкими контурами и читаемым шрифтом</p>
            </div>
          </div>

          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <div class="bg-white rounded-2xl shadow-xl h-[300px]">
              <img [src]="image2" alt="Дизайн" class="w-full h-full object-cover rounded-2xl">
            </div>
            <div class="mt-4">
              <h3 class="text-xl font-bold mb-3 text-gray-800">Креативный дизайн</h3>
              <p class="text-gray-600">Современный дизайн, отражающий динамичность и энергию нашего бренда</p>
            </div>
          </div>

          <div class="group hover:transform hover:scale-105 transition-all duration-300 col-span-2">
            <div class="bg-white rounded-2xl shadow-xl h-[400px]">
              <img [src]="image3" alt="Элементы" class="w-full h-full object-cover rounded-2xl">
            </div>
            <div class="mt-4">
              <h3 class="text-xl font-bold mb-3 text-gray-800">Фирменные элементы</h3>
              <p class="text-gray-600">Яркие и запоминающиеся детали бренда</p>
            </div>
          </div>
        </div>

        <!-- Брендированная продукция -->
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">Брендированная продукция</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" @staggerAnimation>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image5" alt="Держатель" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image12" alt="Свитшот" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image13" alt="Термокружка" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image8" alt="Кепка" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image9" alt="Коробка" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image10" alt="Пакет" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image11" alt="Папка" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <img [src]="image14" alt="Футболка" class="rounded-xl shadow-lg w-full h-48 object-cover">
          </div>
        </div>

        <!-- Элементы фирменного стиля -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img [src]="image6" alt="Салфетки" class="w-full h-80 object-cover">
            </div>
            <div class="mt-4">
              <h4 class="text-2xl font-bold mb-4 text-gray-800">Фирменные салфетки</h4>
              <p class="text-gray-600">Стильные аксессуары с узнаваемым дизайном</p>
            </div>
          </div>
          <div class="group hover:transform hover:scale-105 transition-all duration-300">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img [src]="image7" alt="Брендинг" class="w-full h-80 object-cover">
            </div>
            <div class="mt-4">
              <h4 class="text-2xl font-bold mb-4 text-gray-800">Элементы брендинга</h4>
              <p class="text-gray-600">Каждая деталь продумана для создания целостного образа</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .group:hover img {
      transform: scale(1.05);
      transition: transform 0.3s ease-in-out;
    }
    
    img {
      transition: transform 0.3s ease-in-out;
    }
  `]
})
export class BrandIdentityComponent {
  image1 = 'assets/images/Untitled-1.png';
  image2 = 'assets/images/Lut.jpeg';
  image3 = 'assets/images/Stick.png';
  image4 = 'assets/images/TEA.png';
  image5 = 'assets/images/Holder.png';
  image6 = 'assets/images/Napkins 1.png';
  image7 = 'assets/images/Napkins.png';
  image8 = 'assets/images/Кепка.png';
  image9 = 'assets/images/Коробка.png';
  image10 = 'assets/images/Пакет.png';
  image11 = 'assets/images/Папка.png';
  image12 = 'assets/images/Свитшот.png';
  image13 = 'assets/images/Термокружка.png';
  image14 = 'assets/images/Футболка.png';
}
