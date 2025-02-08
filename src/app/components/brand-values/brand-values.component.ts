import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMugHot, faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-brand-values',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <section class="py-8 bg-gray-50">
      <div class="container mx-auto px-2">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-coral">Ценности бренда</h2>

        <div class="flex justify-between gap-2">
          <!-- Ежедневная радость -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-coral rounded-full flex items-center justify-center mb-3">
              <fa-icon [icon]="heartIcon" class="text-white text-lg md:text-2xl"></fa-icon>
            </div>
            <h3 class="text-sm md:text-xl font-semibold mb-2 md:mb-3">Ежедневная радость</h3>
            <p class="text-gray-600 text-xs md:text-lg">
              Мы делаем каждый день немного лучше, добавляя чашку удовольствия.
            </p>
          </div>

          <!-- Доступность -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-coral rounded-full flex items-center justify-center mb-3">
              <fa-icon [icon]="cupIcon" class="text-white text-lg md:text-2xl"></fa-icon>
            </div>
            <h3 class="text-sm md:text-xl font-semibold mb-2 md:mb-3">Доступность</h3>
            <p class="text-gray-600 text-xs md:text-lg">
              Чай — для всех, в любое время.
            </p>
          </div>

          <!-- Свежий подход -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-12 h-12 md:w-16 md:h-16 bg-coral rounded-full flex items-center justify-center mb-3">
              <fa-icon [icon]="ideaIcon" class="text-white text-lg md:text-2xl"></fa-icon>
            </div>
            <h3 class="text-sm md:text-xl font-semibold mb-2 md:mb-3">Свежий подход</h3>
            <p class="text-gray-600 text-xs md:text-lg">
              Мы экспериментируем, создаём новые вкусы и стремимся удивить.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .bg-coral {
      background-color: #0066FF;
    }
  `]
})
export class BrandValuesComponent {
  heartIcon = faHeart;
  cupIcon = faMugHot;
  ideaIcon = faLightbulb;
}
