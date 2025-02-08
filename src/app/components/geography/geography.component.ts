import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Attribution } from 'ol/control';

@Component({
  selector: 'app-geography-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="geography" class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-3 tracking-tight">
            МЕЖДУНАРОДНОЕ РАЗВИТИЕ
          </h2>
          <h3 class="text-2xl font-bold text-coral">
            TEADAY
          </h3>
        </div>

        <div class="flex flex-col-reverse lg:flex-row gap-8">
          <!-- Карта -->
          <div class="w-full lg:w-2/3" [@fadeIn]>
            <div class="h-full rounded-2xl overflow-hidden shadow-2xl">
              <div #mapElement class="h-[400px]"></div>
            </div>
          </div>

          <!-- Информация -->
          <div class="w-full lg:w-1/3 flex items-center" [@fadeIn]>
            <div class="h-[400px] w-full rounded-2xl p-8 flex items-center">
              <p class="text-lg leading-relaxed text-gray-700">
                Бренд <span class="text-coral font-semibold">TEADAY</span> планирует активное расширение не только в Казахстане.
                <span class="block mt-4">Мы видим значительные возможности для роста и готовы к выходу на новые рынки.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class GeographyMapComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;

  private map!: Map;

  ngAfterViewInit() {
    this.initMap();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.map.updateSize();
      }, 200);
    });
  }

  private initMap() {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([66.9237, 48.0196]),
        zoom: 5,
        minZoom: 3,
        maxZoom: 18
      }),
      controls: [new Attribution()]
    });
  }
}
