import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appSlide]',
  standalone: true
})
export class SlideDirective implements OnInit {
  @Input() direction: 'left' | 'right' | 'up' | 'down' = 'left';
  @Input() delay = 0;
  @Input() duration = 600;
  @Input() distance = '50px';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Определяем начальную позицию
    const getTransform = () => {
      switch (this.direction) {
        case 'left': return `translateX(-${this.distance})`;
        case 'right': return `translateX(${this.distance})`;
        case 'up': return `translateY(-${this.distance})`;
        case 'down': return `translateY(${this.distance})`;
      }
    };

    // Начальные стили
    Object.assign(this.el.nativeElement.style, {
      opacity: '0',
      transform: getTransform(),
      transition: `all ${this.duration}ms ease-out ${this.delay}ms`
    });

    // Создаем observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              Object.assign(this.el.nativeElement.style, {
                opacity: '1',
                transform: 'translate(0)'
              });
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
