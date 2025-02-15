import {Component, OnInit} from '@angular/core';
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
import {trigger, transition, style, animate, state} from '@angular/animations';

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
    <div class="curtain" [@curtainAnimation]="curtainState">
      <img src="assets/images/teaday.png" alt="TeaDay Logo" class="curtain-image">
    </div>
    <app-header/>
    <main>
      <app-hero/>
      <app-about-our-company/>
      <app-concept/>
      <app-brand-values/>
      <app-partnership/>
      <app-geography-map/>
      <app-formats/>
      <app-contact/>
      <app-brand-identity/>
    </main>
    <app-social-icons />
    <app-footer/>
  `,
  styles: [`
    .curtain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-origin: top;
    }
    .curtain-image {
      width: 300px;
      height: auto;
    }
  `],
  animations: [
    trigger('curtainAnimation', [
      state('visible', style({ transform: 'scaleY(1)' })),
      state('hidden', style({ transform: 'scaleY(0)' })),
      transition('visible => hidden', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  curtainState = 'visible';

  ngOnInit() {
    setTimeout(() => {
      this.curtainState = 'hidden';
    }, 500);
  }
}
