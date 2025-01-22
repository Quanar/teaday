import { Component, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { easeOut } from 'ol/easing';
import { Attribution } from 'ol/control';

interface City {
  name: string;
  count: number;
  coordinates: [number, number];
}

@Component({
  selector: 'app-geography-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="geography" class="py-12 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-2">
          МЕЖДУНАРОДНОЕ РАЗВИТИЕ
        </h2>
        <h3 class="text-2xl font-bold text-center mb-8 text-coral">
          TEADAY
        </h3>

        <div class="flex flex-col lg:flex-row items-stretch gap-8">
          <!-- Карта -->
          <div class="w-full lg:w-2/3" [@fadeIn]>
            <div class="map-container rounded-xl overflow-hidden shadow-2xl">
              <div #mapElement class="map-element"></div>
            </div>
          </div>

          <!-- Информация -->
          <div class="w-full lg:w-1/3 flex flex-col gap-6" [@slideIn]>
            <div class="flex-[2] bg-white rounded-xl p-5 shadow-lg flex flex-col justify-center">
              <p class="text-base leading-relaxed text-gray-700">
                Бренд <span class="text-coral">TEADAY</span> планирует активное расширение не только в Казахстане.
                Мы видим значительные возможности для роста и готовы к выходу на новые рынки.
              </p>
            </div>

            <div class="flex-[3] bg-white rounded-xl p-5 shadow-lg flex flex-col">
              <h3 class="text-lg font-bold mb-4 text-gray-800">Наши точки:</h3>
              <div class="flex-1 space-y-3">
                <div *ngFor="let city of cities()"
                     class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                     (mouseenter)="highlightCity(city)"
                     (mouseleave)="resetHighlight()">
                  <div>
                    <span class="font-medium text-base">{{city.name}}</span>
                    <div class="text-sm text-gray-500">{{city.count}} точки</div>
                  </div>
                  <div class="w-10 h-10 rounded-full flex items-center justify-center">
                    <span class="text-lg font-bold text-coral">{{city.count}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .map-container {
      width: 100%;
      position: relative;
      padding-top: 80%;
    }

    .map-element {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }

    @media (max-width: 1024px) {
      .map-container {
        padding-top: 75%;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('800ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class GeographyMapComponent implements AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;

  private map!: Map;
  private vectorLayer!: VectorLayer<VectorSource>;
  private vectorSource!: VectorSource;

  cities = signal<City[]>([
    {
      name: 'Астана',
      count: 4,
      coordinates: [71.4704, 51.1605]
    },
    {
      name: 'Алматы',
      count: 4,
      coordinates: [76.9286, 43.2220]
    },
    {
      name: 'Казань',
      count: 2,
      coordinates: [49.1221, 55.7887]
    },
    {
      name: 'Уфа',
      count: 2,
      coordinates: [56.0375, 54.7431]
    }
  ]);

  ngAfterViewInit() {
    this.initMap();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.map.updateSize();
      }, 200);
    });
  }

  private initMap() {
    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: (feature) => {
        const highlighted = feature.get('highlighted');
        return this.createPointStyle(highlighted);
      }
    });

    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([66.9237, 48.0196]),
        zoom: 5,
        minZoom: 3,
        maxZoom: 18
      }),
      controls: [new Attribution()]
    });

    this.addCityPoints();
  }

  private createPointStyle(highlighted: boolean = false) {
    return new Style({
      image: new CircleStyle({
        radius: highlighted ? 12 : 8,
        fill: new Fill({
          color: '#0066FF'
        }),
        stroke: new Stroke({
          color: 'white',
          width: 2
        })
      })
    });
  }

  private addCityPoints() {
    this.cities().forEach(city => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(city.coordinates)),
        name: city.name
      });

      this.vectorSource.addFeature(feature);
    });
  }

  highlightCity(city: City) {
    const features = this.vectorSource.getFeatures();
    features.forEach(feature => {
      if (feature.get('name') === city.name) {
        feature.set('highlighted', true);
        this.map.getView().animate({
          center: fromLonLat(city.coordinates),
          duration: 1000,
          easing: easeOut
        });
      }
    });
  }

  resetHighlight() {
    const features = this.vectorSource.getFeatures();
    features.forEach(feature => {
      feature.set('highlighted', false);
    });
  }
}
