import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFade]',
  standalone: true
})
export class FadeDirective implements OnInit {
  @Input() delay = 0;
  @Input() duration = 600;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Начальные стили
    Object.assign(this.el.nativeElement.style, {
      opacity: '0',
      transition: `opacity ${this.duration}ms ease-out ${this.delay}ms`
    });

    // Создаем observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.el.nativeElement.style.opacity = '1';
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.el.nativeElement);
  }
}
