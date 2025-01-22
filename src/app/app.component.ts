import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {HeroComponent} from './components/hero/hero.component';
import {ConceptComponent} from './components/concept/concept.component';
import {MetricsComponent} from './components/metrics/metrics.component';
import {BusinessModelComponent} from './components/business-model/business-model.component';
import {PartnershipComponent} from './components/partnership/partnership.component';
import {GeographyMapComponent} from './components/geography/geography.component';
import {FormatsComponent} from './components/formats/formats.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeroComponent,
    ConceptComponent,
    MetricsComponent,
    BusinessModelComponent,
    PartnershipComponent,
    FormatsComponent,
    ContactComponent,
    FooterComponent,
    GeographyMapComponent
  ],
  template: `
    <app-header/>
    <main>
      <app-hero/>
      <app-concept/>
      <app-metrics/>
      <app-business-model/>
      <app-partnership/>
      <app-geography-map/>
      <app-formats/>
      <app-contact/>
    </main>
    <app-footer/>
  `
})
export class AppComponent {
}
