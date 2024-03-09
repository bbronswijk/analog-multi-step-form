import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SlideToggleComponent } from '../ui/slide-toggle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { CardComponent } from '../ui/card.component';
import { FormService } from '../services/form.service';
import { RouteMeta } from '@analogjs/router';
import { routes } from '../util/routes';
import { MobileCardComponent } from '../ui/mobile-card.component';
import { FooterComponent } from '../ui/footer.component';

export interface Plan {
  icon: string;
  name: string;
  pricePerMonth: number;
  pricePerYear: number;
}

export const routeMeta: RouteMeta = {
  canActivate: [() => {
    if (inject(FormService).form.get('personalInfo')?.invalid) {
      inject(Router).navigate([routes.personalInfo]);
      return false;
    }

    return true;
  }],
};

@Component({
  selector: 'app-select-plan',
  standalone: true,
  template: `
    <form [formGroup]="formService.form" class="flex flex-col h-full" #form="ngForm">
      <app-mobile-card class="flex-1">
        <h1 class="font-bold text-4xl text-marine-blue">Select your plan</h1>
        <p class="text-cool-gray pt-2">
          You have the option of monthly or yearly billing.
        </p>

        <section class="flex flex-col md:flex-row items-start gap-4 my-8">
          @for (plan of plans; track plan.name) {
            <app-card class="flex-1 flex gap-4 md:gap-10 md:flex-col w-full" (click)="selectPlan(plan)"
                      [checked]="formService.form.get('plan')?.value?.name === plan.name">
              <img alt="Arcade" [src]="plan.icon" width="40" height="40"/>

              <div>
                <h2 class="mt-auto font-bold">{{ plan.name }}</h2>

                @if (formService.yearlyBillingSelected) {
                  <div class="text-cool-gray">{{ plan.pricePerYear | currency:'USD' }}/yr</div>
                  <div class="text-xs">2 months free</div>
                } @else {
                  <div class="text-cool-gray">{{ plan.pricePerMonth | currency:'USD' }}/mo</div>
                }
              </div>
            </app-card>
          }
        </section>

        <section class="flex justify-center items-center bg-alabaster rounded p-4 gap-4">
          <label class="font-bold duration-300" [ngClass]="{'text-cool-gray': formService.yearlyBillingSelected}">
            Monthly
          </label>
          <app-slide-toggle formControlName="yearlyBilling"></app-slide-toggle>
          <label class="font-bold duration-300" [ngClass]="{'text-cool-gray': !formService.yearlyBillingSelected}">
            Yearly
          </label>
        </section>
      </app-mobile-card>

      <app-footer>
        <button class="text-cool-gray hover:text-marine-blue font-bold rounded-lg py-3 px-6 mr-auto"
                [routerLink]="routes.personalInfo">
          Go back
        </button>
        <span [ngClass]="formService.form.get('plan')?.invalid && form.submitted ? 'opacity-100' : 'opacity-0'"
              class="text-strawberry-red text-sm">Please select a plan</span>
        <button class="bg-marine-blue hover:bg-purplish-blue text-white font-bold rounded-lg py-3 px-6"
                type="submit"
                [routerLink]="routes.addOns">
          Next step
        </button>
      </app-footer>
    </form>
  `,
  imports: [
    CommonModule,
    RouterLink,
    SlideToggleComponent,
    ReactiveFormsModule,
    NgClass,
    CardComponent,
    NgIf,
    MobileCardComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPlanPage {
  public formService = inject(FormService);
  public routes: typeof routes = routes;

  public plans: Plan[] = [
    {
      icon: '/images/icon-arcade.svg',
      name: 'Arcade',
      pricePerMonth: 9,
      pricePerYear: 90,
    },
    {
      icon: '/images/icon-advanced.svg',
      name: 'Advanced',
      pricePerMonth: 12,
      pricePerYear: 120,
    },
    {
      icon: '/images/icon-pro.svg',
      name: 'Pro',
      pricePerMonth: 15,
      pricePerYear: 150,
    },
  ];

  public selectPlan(plan: Plan) {
    this.formService.form.patchValue({plan});
  }
}
