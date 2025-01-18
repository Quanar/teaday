import { Injectable, signal } from '@angular/core';

export type ColorScheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorScheme = signal<ColorScheme>('light');
  private readonly STORAGE_KEY = 'preferred-theme';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as ColorScheme;
    if (savedTheme) {
      this.setColorScheme(savedTheme);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setColorScheme('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        this.setColorScheme(e.matches ? 'dark' : 'light');
      });
  }

  getColorScheme() {
    return this.colorScheme.asReadonly();
  }

  setColorScheme(scheme: ColorScheme): void {
    this.colorScheme.set(scheme);
    localStorage.setItem(this.STORAGE_KEY, scheme);
    document.documentElement.setAttribute('data-theme', scheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content',
        scheme === 'dark' ? '#1a1a1a' : '#ffffff'
      );
    }
  }

  toggleColorScheme(): void {
    const newScheme = this.colorScheme() === 'light' ? 'dark' : 'light';
    this.setColorScheme(newScheme);
  }
}
