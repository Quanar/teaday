import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about-our-company',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <section id="about" class="relative py-6 overflow-hidden">
      <div class="container relative mx-auto px-4">
        <!-- Заголовок -->
        <h2 class="text-4xl font-bold mb-12 text-coral">
          О НАШЕЙ<br>КОМПАНИИ
        </h2>

        <div class="flex flex-col lg:flex-row gap-12">
          <!-- Левая колонка -->
          <div class="lg:w-1/2 lg:ml-8 flex flex-col justify-between">
            <div>
              <p class="text-lg mb-8">
                <span class="text-black font-bold">Первая Казахстанская сеть</span> чайных спотов
                от основателя <span class="text-black font-bold">EspressoDay</span>
              </p>

              <div>
                <img
                  ngSrc="assets/images/teaday_cups.jpg"
                  alt="О нашей компании"
                  width="450"
                  height="200"
                  class="rounded-lg shadow-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="lg:w-1/2 flex flex-col justify-between">
            <div>
              <div class="hidden lg:block mb-8">
                <img
                  ngSrc="assets/images/teaday_girl.jpg"
                  alt="О нашей компании"
                  width="500"
                  height="350"
                  class="rounded-lg shadow-lg object-cover"
                  priority
                />
              </div>

              <p class="text-lg">
                <span class="text-black font-bold">Цель</span> – открыть
                <span class="text-black font-bold">100</span> чайных спотов по всему
                <span class="text-black font-bold">Казахстану</span> и не только
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutOurCompanyComponent {
}
