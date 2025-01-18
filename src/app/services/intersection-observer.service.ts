import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  private observers = new Map<string, IntersectionObserver>();
  private elementsInView = signal<Set<string>>(new Set());

  createObserver(elementId: string, threshold = 0.1) {
    if (this.observers.has(elementId)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.elementsInView.update(state => {
            const newState = new Set(state);
            if (entry.isIntersecting) {
              newState.add(elementId);
            } else {
              newState.delete(elementId);
            }
            return newState;
          });
        });
      },
      { threshold }
    );

    this.observers.set(elementId, observer);
    return observer;
  }

  observe(element: Element, elementId: string) {
    const observer = this.observers.get(elementId) || this.createObserver(elementId);
    observer?.observe(element);
  }

  unobserve(element: Element, elementId: string) {
    const observer = this.observers.get(elementId);
    if (observer) {
      observer.unobserve(element);
      this.elementsInView.update(state => {
        const newState = new Set(state);
        newState.delete(elementId);
        return newState;
      });
    }
  }

  isInView(elementId: string): boolean {
    return this.elementsInView().has(elementId);
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.elementsInView.set(new Set());
  }
}
