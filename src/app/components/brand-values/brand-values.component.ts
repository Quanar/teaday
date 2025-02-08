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
        <h2 class="text-2xl font-bold text-center mb-6"><span class="text-gradient">Ценности бренда</span></h2>

        <div class="flex justify-between gap-2">
          <!-- Ежедневная радость -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-10 h-10 bg-coral rounded-full flex items-center justify-center mb-1">
              <fa-icon [icon]="heartIcon" class="text-white text-sm"></fa-icon>
            </div>
            <h3 class="text-sm font-semibold mb-1">Ежедневная радость</h3>
            <p class="text-gray-600 text-xs">
              Мы делаем каждый день немного лучше, добавляя чашку удовольствия.
            </p>
          </div>

          <!-- Доступность -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-10 h-10 bg-coral rounded-full flex items-center justify-center mb-1">
              <fa-icon [icon]="cupIcon" class="text-white text-sm"></fa-icon>
            </div>
            <h3 class="text-sm font-semibold mb-1">Доступность</h3>
            <p class="text-gray-600 text-xs">
              Чай — для всех, в любое время.
            </p>
          </div>

          <!-- Свежий подход -->
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-10 h-10 bg-coral rounded-full flex items-center justify-center mb-1">
              <fa-icon [icon]="ideaIcon" class="text-white text-sm"></fa-icon>
            </div>
            <h3 class="text-sm font-semibold mb-1">Свежий подход</h3>
            <p class="text-gray-600 text-xs">
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
