import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../ui/card.component';
import { FormService } from '../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { routes } from '../util/routes';
import { MobileCardComponent } from '../ui/mobile-card.component';
import { FooterComponent } from '../ui/footer.component';

export interface AddOn {
  name: string;
  description: string;
  pricePerMonth: number;
  pricePerYear: number;
}

export const routeMeta: RouteMeta = {
  canActivate: [() => {
    const formService = inject(FormService);
    if (formService.form.get('personalInfo')?.invalid) {
      inject(Router).navigate([routes.personalInfo]);
      return false;
    }

    if (formService.form.invalid) {
      inject(Router).navigate([routes.selectPlan]);
      return false;
    }

    return true;
  }],
};

@Component({
  selector: 'app-add-on',
  standalone: true,
  template: `
    <div class="flex flex-col h-full">
      <app-mobile-card class="flex-1">
        <h1 class="font-bold text-4xl text-marine-blue">Pick add-ons</h1>
        <p class="text-cool-gray pt-2 pb-8">
          Add-ons help enhance your gaming experience.
        </p>

        <section class="space-y-4 flex-1">
          @for (addOn of addOns; track addOn.name) {
            <app-card class="flex items-center w-full gap-4"
                      (click)="formService.toggleAddOn(addOn)"
                      [checked]="formService.addOnIsSelected(addOn)">
              <input type="checkbox" [checked]="formService.addOnIsSelected(addOn)">
              <div class="flex-1">
                <div class="font-bold text-base md:text-lg">{{ addOn.name }}</div>
                <span class="text-cool-gray text-sm     md:text-base">{{ addOn.description }}</span>
              </div>

              @if (formService.yearlyBillingSelected) {
                <span class="text-purplish-blue font-bold">+{{ addOn.pricePerYear | currency:"USD" }}/yr</span>
              } @else {
                <span class="text-purplish-blue font-bold">+{{ addOn.pricePerMonth | currency:"USD" }}/mo</span>
              }
            </app-card>
          }
        </section>
      </app-mobile-card>

      <app-footer>
        <button class="text-cool-gray hover:text-marine-blue font-bold rounded-lg py-3 px-6"
                [routerLink]="routes.selectPlan">
          Go back
        </button>
        <button class="bg-marine-blue hover:bg-purplish-blue text-white font-bold rounded-lg py-3 px-6"
                [routerLink]="routes.summary">
          Next step
        </button>
      </app-footer>
    </div>
  `,
  imports: [
    RouterLink,
    CardComponent,
    ReactiveFormsModule,
    CurrencyPipe,
    MobileCardComponent,
    FooterComponent
  ]
})
export default class AddOnsPage {
  public formService = inject(FormService);
  public routes: typeof routes = routes;

  public addOns: AddOn[] = [
    {
      name: 'Online services',
      description: 'Access to multiplayer games',
      pricePerMonth: 1,
      pricePerYear: 10,
    },
    {
      name: 'Larger storage',
      description: 'Extra 1TB of cloud save',
      pricePerMonth: 2,
      pricePerYear: 20,
    },
    {
      name: 'Customizable profile',
      description: 'Custom theme on your profile',
      pricePerMonth: 2,
      pricePerYear: 20,
    }
  ];
}
