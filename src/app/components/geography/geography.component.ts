import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Attribution } from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { Geometry } from 'ol/geom';

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
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <div #mapElement class="h-[500px] lg:h-[600px]"></div>
            </div>
          </div>

          <!-- Информация -->
          <div class="w-full lg:w-1/3 flex flex-col" [@fadeIn]>
            <div class="mb-6">
              <p class="text-lg leading-relaxed text-gray-700 mb-4">
                Бренд <span class="text-coral font-semibold">TEADAY</span> планирует активное расширение не только в Казахстане.
                <span class="block mt-4">Мы видим значительные возможности для роста и готовы к выходу на новые рынки.</span>
              </p>
            </div>
            
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <h4 class="text-xl font-bold mb-4 text-coral">Наши локации:</h4>
              <ul class="space-y-3">
                <li *ngFor="let city of cities" 
                    class="cursor-pointer transition-all duration-300 hover:bg-gray-50 p-2 rounded"
                    (mouseenter)="highlightCity(city)">
                  <span class="text-gray-700 hover:text-coral font-medium">{{ city.name }}</span>
                </li>
              </ul>
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
  private vectorLayer!: VectorLayer<VectorSource<Feature<Geometry>>>;
  private defaultStyle!: Style;
  private highlightStyle!: Style;
  
  cities = [
    { name: 'Алматы', coordinates: [76.9286, 43.2220] },
    { name: 'Актобе', coordinates: [57.1678, 50.2785] },
    { name: 'Караганды', coordinates: [73.0879, 49.8047] },
    { name: 'Астана', coordinates: [71.4704, 51.1605] },
    { name: 'Дубай', coordinates: [55.2708, 25.2048] },
    { name: 'Медина', coordinates: [39.6142, 24.4686] }
  ];

  ngAfterViewInit() {
    this.initMap();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.map.updateSize();
      }, 200);
    });
  }

  private initMap() {
    this.defaultStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#0066FF' }),
        stroke: new Stroke({
          color: '#ffffff',
          width: 2
        })
      })
    });

    this.highlightStyle = new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({ color: '#FF3333' }),
        stroke: new Stroke({
          color: '#ffffff',
          width: 2
        })
      })
    });

    // Create vector source and features for cities
    const vectorSource = new VectorSource<Feature<Geometry>>({
      features: this.cities.map(city => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(city.coordinates)),
          name: city.name
        });
        feature.setStyle(this.defaultStyle);
        return feature;
      })
    });

    // Create vector layer
    this.vectorLayer = new VectorLayer({
      source: vectorSource
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
  }

  highlightCity(city: { name: string, coordinates: number[] }) {
    const features = this.vectorLayer.getSource()?.getFeatures();
    features?.forEach((feature: Feature<Geometry>) => {
      if (feature.get('name') === city.name) {
        feature.setStyle(this.highlightStyle);
        this.map.getView().animate({
          center: fromLonLat(city.coordinates),
          duration: 1000
        });
      } else {
        feature.setStyle(this.defaultStyle);
      }
    });
  }
}
