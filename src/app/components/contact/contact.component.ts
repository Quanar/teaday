import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="py-20 bg-coral-light">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">
            СТАНЬТЕ ПАРТНЕРОМ <span class="text-coral">TEADAY</span>
          </h2>

          <p class="text-center text-lg mb-12">
            Если вы хотите стать частью нашей успешной команды,
            пожалуйста, оставьте заявку, заполнив форму.
          </p>

          <form [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                class="bg-white rounded-lg p-8 shadow-lg"
                [@formAnimation]>
            <!-- Имя -->
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Имя*
              </label>
              <input type="text"
                     formControlName="name"
                     class="form-input"
                     [class.error]="showError('name')">
              <div *ngIf="showError('name')" class="text-red-500 text-sm mt-1">
                Пожалуйста, введите ваше имя
              </div>
            </div>

            <!-- Телефон -->
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Телефон*
              </label>
              <input type="tel"
                     formControlName="phone"
                     class="form-input"
                     [class.error]="showError('phone')">
              <div *ngIf="showError('phone')" class="text-red-500 text-sm mt-1">
                Пожалуйста, введите корректный номер телефона
              </div>
            </div>

            <!-- Email -->
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Email*
              </label>
              <input type="email"
                     formControlName="email"
                     class="form-input"
                     [class.error]="showError('email')">
              <div *ngIf="showError('email')" class="text-red-500 text-sm mt-1">
                Пожалуйста, введите корректный email
              </div>
            </div>

            <!-- Город -->
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Город*
              </label>
              <input type="text"
                     formControlName="city"
                     class="form-input"
                     [class.error]="showError('city')">
              <div *ngIf="showError('city')" class="text-red-500 text-sm mt-1">
                Пожалуйста, укажите ваш город
              </div>
            </div>

            <!-- Комментарий -->
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Комментарий
              </label>
              <textarea formControlName="comment"
                        rows="4"
                        class="form-input"></textarea>
            </div>

            <!-- Согласие -->
            <div class="mb-6">
              <label class="flex items-center">
                <input type="checkbox"
                       formControlName="agreement"
                       class="form-checkbox">
                <span class="ml-2 text-sm text-gray-600">
                  Я согласен на обработку персональных данных
                </span>
              </label>
              <div *ngIf="showError('agreement')" class="text-red-500 text-sm mt-1">
                Необходимо согласие на обработку персональных данных
              </div>
            </div>

            <!-- Кнопка отправки -->
            <button type="submit"
                    [disabled]="!contactForm.valid"
                    class="w-full bg-coral text-white font-bold py-3 px-4 rounded-lg
                           hover:bg-coral-dark transition-colors disabled:opacity-50">
              ОСТАВИТЬ ЗАЯВКУ
            </button>
          </form>

          <!-- Сообщение об успешной отправке -->
          <div *ngIf="isSubmitted"
               class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
               [@fadeIn]>
            <div class="bg-white p-8 rounded-lg max-w-md mx-4">
              <h3 class="text-2xl font-bold mb-4">Спасибо за заявку!</h3>
              <p class="mb-6">
                Мы свяжемся с вами в ближайшее время для обсуждения деталей сотрудничества.
              </p>
              <button (click)="isSubmitted = false"
                      class="w-full bg-coral text-white font-bold py-2 px-4 rounded">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-input {
      @apply w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-coral;

      &.error {
        @apply border-red-500;
      }
    }

    .form-checkbox {
      @apply rounded text-coral focus:ring-coral;
    }

    textarea.form-input {
      @apply resize-none;
    }
  `],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\\+?[0-9]{10,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      comment: [''],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  showError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Здесь будет логика отправки формы
      this.isSubmitted = true;
      this.contactForm.reset();
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}
