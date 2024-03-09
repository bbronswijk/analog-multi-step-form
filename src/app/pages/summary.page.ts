import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormService } from '../services/form.service';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { MobileCardComponent } from '../ui/mobile-card.component';
import { FooterComponent } from '../ui/footer.component';

export const routeMeta: RouteMeta = {
  canActivate: [() => {
    if (inject(FormService).form.invalid) {
      inject(Router).navigate(['/personal-info']);
      return false;
    }

    return true;
  }],
};

@Component({
  selector: 'app-summary',
  standalone: true,
  template: `
    <div class="flex flex-col h-full">
      <app-mobile-card class="flex-1">
        <h1 class="font-bold text-4xl text-marine-blue">Finishing up</h1>
        <p class="text-cool-gray pt-2 pb-8">
          Double-check everything looks OK before confirming.
        </p>

        <section class="grid grid-cols-2 gap-y-2 rounded-lg p-6 bg-magnolia">
          <label>
            <b class="block text-lg">
              {{ formService.selectedPlan?.name }}
              ({{ formService.yearlyBillingSelected ? 'Yearly' : 'Monthly' }})
            </b>
            <a routerLink="/select-plan" class="text-purplish-blue underline text-right">Change</a>
          </label>

          @if (formService.yearlyBillingSelected) {
            <span class="text-right">+{{ formService.selectedPlan?.pricePerYear | currency:"USD" }}/yr</span>
          } @else {
            <span class="text-right">+{{ formService.selectedPlan?.pricePerMonth | currency:"USD" }}/mo</span>
          }

          @if (formService.selectedAddOns.length) {
            <hr class="col-span-2 my-2">
          }

          @for (addOn of formService.selectedAddOns; track addOn.name) {
            <label class="text-cool-gray">{{ addOn.name }}</label>
            @if (formService.yearlyBillingSelected) {
              <span class="text-right">+{{ addOn.pricePerYear | currency:"USD" }}/yr</span>
            } @else {
              <span class="text-right">+{{ addOn.pricePerMonth | currency:"USD" }}/mo</span>
            }
          }
        </section>

        @if (formService.yearlyBillingSelected) {
          <section class="flex justify-between py-4 px-6">
            <label class="text-cool-gray">Total (per year)</label>
            <span class="text-purplish-blue text-xl font-bold text-right">
            +{{ formService.total | currency:"USD" }}/yr
          </span>
          </section>
        } @else {
          <section class="flex justify-between py-4 px-6">
            <label class="text-cool-gray">Total (per month)</label>
            <span class="text-purplish-blue text-xl font-bold text-right">
            +{{ formService.total | currency:"USD" }}/mo
          </span>
          </section>
        }

      </app-mobile-card>
      <app-footer>
        <button class="text-cool-gray hover:text-marine-blue font-bold rounded-lg py-3 px-6"
                routerLink="/add-ons">Go back
        </button>
        <button class="bg-purplish-blue hover:bg-purplish-blue text-white font-bold rounded-lg py-3 px-6" routerLink="/thank-you">Confirm
        </button>
      </app-footer>
    </div>
  `,
  imports: [
    RouterLink,
    NgIf,
    CurrencyPipe,
    MobileCardComponent,
    FooterComponent
  ]
})
export default class SummaryPage {
  public formService = inject(FormService);
  protected readonly FormService = FormService;
}
