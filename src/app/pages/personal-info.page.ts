import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormService } from '../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputComponent } from '../ui/input.component';
import { routes } from '../util/routes';
import { MobileCardComponent } from '../ui/mobile-card.component';
import { FooterComponent } from '../ui/footer.component';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  template: `
    <form class="flex flex-col h-full" [formGroup]="formService.form" #form="ngForm">
      <app-mobile-card class="flex-1">
        <h1 class="font-bold text-4xl text-marine-blue">Personal info</h1>
        <p class="text-cool-gray pt-2 pb-8">
          Please provide your name, email address, and phone number.
        </p>

        <div formGroupName="personalInfo" class="flex flex-col gap-y-4 flex-1">
          <app-input formControlName="name"
                     label="Name"
                     placeholder="e.g. Stephen King"
                     [invalid]="formService.isInvalid('personalInfo.name') && form.submitted">
            <span *ngIf="formService.form.get('personalInfo.name')?.hasError('required') && form.submitted"
                  class="text-strawberry-red ml-auto">
              This field is required
            </span>
          </app-input>
          <app-input formControlName="email"
                     label="Email Address"
                     placeholder="e.g. stephenking@lorem.com"
                     [invalid]="formService.isInvalid('personalInfo.email') && form.submitted">
            <span *ngIf="formService.form.get('personalInfo.email')?.hasError('required') && form.submitted"
                  class="text-strawberry-red ml-auto">
              This field is required
            </span>
            <span *ngIf="formService.form.get('personalInfo.email')?.hasError('invalidEmail') && form.submitted"
                  class="text-strawberry-red ml-auto">
              Provided email is not valid
            </span>
          </app-input>
          <app-input formControlName="phone"
                     label="Phone Number"
                     placeholder="e.g. +1 234 567 890"
                     [invalid]="formService.isInvalid('personalInfo.phone') && form.submitted">
            <span *ngIf="formService.form.get('personalInfo.phone')?.hasError('required') && form.submitted"
                  class="text-strawberry-red ml-auto">
              This field is required
            </span>
          </app-input>
        </div>
      </app-mobile-card>

      <app-footer>
        <button class="bg-marine-blue hover:bg-purplish-blue text-white font-bold rounded-lg py-3 px-6 ml-auto"
                type="submit"
                [routerLink]="routes.selectPlan">
          Next step
        </button>
      </app-footer>
    </form>
  `,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    InputComponent,
    MobileCardComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PersonalInfoPage {
  public formService = inject(FormService);
  public routes: typeof routes = routes;
}
