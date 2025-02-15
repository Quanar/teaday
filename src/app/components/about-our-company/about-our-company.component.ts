import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-our-company',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <section id="about" class="relative py-12 overflow-hidden bg-gradient-to-b from-white to-coral-light">
      <div class="container relative mx-auto px-4">
        <!-- Заголовок -->
        <h2 class="text-4xl md:text-5xl font-extrabold mb-8 md:mb-16 text-coral tracking-wide text-center md:text-left">
          О НАШЕЙ<br><span class="text-black">КОМПАНИИ</span>
        </h2>

        <div class="flex flex-col lg:flex-row gap-8 md:gap-16">
          <!-- Левая колонка -->
          <div class="w-full lg:w-1/2 lg:ml-8 flex flex-col justify-between">
            <div>
              <p class="text-lg md:text-xl mb-6 md:mb-10 leading-relaxed text-center md:text-left">
                <span class="text-black font-bold">Первая Казахстанская сеть</span> чайных спотов
                от основателя <span class="text-coral font-bold hover:text-coral-dark transition-colors duration-300">EspressoDay</span>
              </p>

              <div class="transform hover:scale-105 transition-transform duration-300 mx-auto md:mx-0">
                <img
                  ngSrc="assets/images/teaday_cups.jpg"
                  alt="О нашей компании"
                  width="450"
                  height="200"
                  class="rounded-2xl shadow-2xl object-cover w-full md:w-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <!-- Правая колонка -->
          <div class="w-full lg:w-1/2 flex flex-col justify-between mt-8 lg:mt-0">
            <div>
              <div class="hidden lg:block mb-10 transform hover:scale-105 transition-transform duration-300">
                <img
                  ngSrc="assets/images/teaday_girl.jpg"
                  alt="О нашей компании"
                  width="500"
                  height="350"
                  class="rounded-2xl shadow-2xl object-cover w-full"
                  priority
                />
              </div>

              <p class="text-lg md:text-xl leading-relaxed text-center md:text-left">
                <span class="text-black font-bold">Цель</span> – открыть
                <span class="text-coral font-bold text-xl md:text-2xl">100</span> чайных спотов по всему
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
