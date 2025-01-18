import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen bg-coral-light pt-20 relative overflow-hidden">
      <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="text-content lg:w-1/2" [@fadeInUp]>
            <h1 class="text-5xl lg:text-7xl font-bold mb-6">
              СТАНЬ ПАРТНЕРОМ
              <br>
              <span class="text-primary">TEADAY</span>
            </h1>
            <button class="bg-black text-white px-8 py-3 rounded text-lg hover:bg-opacity-90 transition-all">
              ОСТАВИТЬ ЗАЯВКУ
            </button>
          </div>

          <div class="lg:w-1/2 mt-12 lg:mt-0" [@slideIn]>
            <div class="relative">
              <img src="assets/tea-cups.png" alt="Чайные напитки" class="w-full max-w-lg mx-auto">
              <div class="absolute top-0 right-0 -z-10">
                <img src="assets/circle-pattern.svg" alt="" class="w-64 opacity-20">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Декоративные элементы -->
      <div class="absolute top-1/4 left-0 -z-10">
        <img src="assets/dots-pattern.svg" alt="" class="w-32 opacity-10">
      </div>
      <div class="absolute bottom-1/4 right-0 -z-10">
        <img src="assets/dots-pattern.svg" alt="" class="w-32 opacity-10">
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('800ms 200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class HeroComponent {}
