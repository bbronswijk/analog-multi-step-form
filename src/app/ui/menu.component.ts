import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { routes } from '../util/routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'app-menu',
  template: `
    <nav class="md:col-start-1 md:row-start-1 md:-row-end-1 md:w-72 md:h-full bg-cover md:rounded-xl justify-center md:justify-start pt-6 pb-20 md:p-10 flex md:flex-col gap-y-8 bg-[url('/images/bg-sidebar-mobile.svg')] md:bg-[url('/images/bg-sidebar-desktop.svg')]">
      <app-menu-item [routerLink]="routes.personalInfo" [index]="1">your info</app-menu-item>
      <app-menu-item [routerLink]="routes.selectPlan" [index]="2">select plan</app-menu-item>
      <app-menu-item [routerLink]="routes.addOns" [index]="3">add-ons</app-menu-item>
      <app-menu-item [routerLink]="routes.summary" [index]="4">summary</app-menu-item>
    </nav>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgStyle,
    RouterLink,
    RouterLinkActive,
    MenuItemComponent
  ]
})
export class MenuComponent {
  public routes: typeof routes = routes;
}
