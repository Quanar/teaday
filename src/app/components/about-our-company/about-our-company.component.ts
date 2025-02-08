import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about-our-company',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <section id="metrics" class="py-6 relative overflow-hidden">
      <!-- Дополнительная информация -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
        <!-- Текстовый блок -->
        <div class="lg:w-1/2">
          <div class="px-8">
            <h3 class="text-2xl font-bold mb-4 text-coral">О нашей компании</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              <span class="text-black font-bold">Первая Казахстанская сеть</span> чайных спотов от основателя <span class="text-black font-bold">EspressoDay</span>.
            </p>
            <p class="text-gray-600 leading-relaxed mb-4">
              <span class="text-black font-bold">Цель</span> – открыть <span class="text-black font-bold">100</span> чайных спотов по всему <span class="text-black font-bold">Казахстану</span> и не только.
            </p>

            <!-- Изображение -->
            <div class="mb-4 leading-relaxed">
              <img
                ngSrc="assets/images/about_our_company.jpg"
                alt="О нашей компании"
                width="350"
                height="70"
                class="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutOurCompanyComponent {
}
