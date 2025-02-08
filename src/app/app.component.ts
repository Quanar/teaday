import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {HeroComponent} from './components/hero/hero.component';
import {ConceptComponent} from './components/concept/concept.component';
import {AboutOurCompanyComponent} from './components/about-our-company/about-our-company.component';
import {PartnershipComponent} from './components/partnership/partnership.component';
import {GeographyMapComponent} from './components/geography/geography.component';
import {FormatsComponent} from './components/formats/formats.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';
import {SocialIconsComponent} from "./components/social-icons/social-icons.component";
import {BrandIdentityComponent} from "./components/brand-identity/brand-identity.component";
import {BrandValuesComponent} from "./components/brand-values/brand-values.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeroComponent,
    ConceptComponent,
    AboutOurCompanyComponent,
    PartnershipComponent,
    FormatsComponent,
    ContactComponent,
    FooterComponent,
    GeographyMapComponent,
    SocialIconsComponent,
    BrandIdentityComponent,
    BrandValuesComponent
  ],
  template: `
    <app-header/>
    <main>
      <app-hero/>
      <app-about-our-company/>
      <app-concept/>
      <app-brand-values/>
<!--      <app-partnership/>-->
      <app-geography-map/>
      <app-formats/>
      <app-contact/>
      <app-brand-identity/>
    </main>
    <app-social-icons />
    <app-footer/>
  `
})
export class AppComponent {
}
