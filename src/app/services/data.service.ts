import { Injectable, signal } from '@angular/core';

export interface BusinessMetrics {
  revenue: string;
  profitability: string;
  paybackPeriod: string;
  initialInvestment: string;
  entryFee: string;
  royalty: string;
}

export interface Location {
  city: string;
  points: number;
}

export interface Format {
  id: string;
  name: string;
  description: string;
  area: string;
  investment: string;
  openingTime: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private businessMetrics = signal<BusinessMetrics>({
    revenue: '12-18 млн тг/мес',
    profitability: '20-30%',
    paybackPeriod: '8-12 месяцев',
    initialInvestment: 'от 12 млн тг',
    entryFee: 'от 2.4 млн тг',
    royalty: '3%'
  });

  private locations = signal<Location[]>([
    { city: 'Астана', points: 4 },
    { city: 'Алматы', points: 4 },
    { city: 'Казань', points: 2 },
    { city: 'Уфа', points: 2 }
  ]);

  private formats = signal<Format[]>([
    {
      id: 'kiosk',
      name: 'Киоск',
      description: 'Мобильный и универсальный формат, идеально подходящий для мест с высоким потоком людей на открытом воздухе.',
      area: 'от 15-30 кв. м.',
      investment: 'от 15 млн. тг.',
      openingTime: 'от 1 мес',
      image: 'assets/format-kiosk.jpg'
    },
    {
      id: 'cafe',
      name: 'Кафе',
      description: 'Полноценное кафе с посадочными местами и расширенным меню.',
      area: 'от 50-120 кв. м.',
      investment: 'от 25 млн. тг.',
      openingTime: 'от 2 мес',
      image: 'assets/format-cafe.jpg'
    },
    {
      id: 'island',
      name: 'Остров',
      description: 'Компактная точка в торговом центре с базовым ассортиментом.',
      area: 'от 6-15 кв. м.',
      investment: 'от 18 млн. тг.',
      openingTime: 'от 1.5 мес',
      image: 'assets/format-island.jpg'
    }
  ]);

  getBusinessMetrics() {
    return this.businessMetrics.asReadonly();
  }

  getLocations() {
    return this.locations.asReadonly();
  }

  getFormats() {
    return this.formats.asReadonly();
  }

  submitApplication(formData: any): Promise<boolean> {
    return new Promise((resolve) => {
      console.log('Отправка заявки:', formData);
      setTimeout(() => {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        applications.push({
          ...formData,
          id: Date.now(),
          date: new Date().toISOString()
        });
        localStorage.setItem('applications', JSON.stringify(applications));
        resolve(true);
      }, 1000);
    });
  }
}
