import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Plan } from '../pages/select-plan.page';
import { AddOn } from '../pages/add-ons.page';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  /** Application state */
  public form = new FormGroup({
    personalInfo: new FormGroup({
      name: new FormControl('sds', Validators.required),
      email: new FormControl('sf', Validators.required),
      phone: new FormControl('sf', Validators.required),
    }),
    plan: new FormControl<Plan|undefined>(undefined, { nonNullable: true, validators: Validators.required }),
    yearlyBilling: new FormControl(false, { nonNullable: true }),
    addOns: new FormControl<AddOn[]>([]),
  });

  /** User selected yearly billing. */
  public get yearlyBillingSelected(): boolean {
    return this.form.get('yearlyBilling')?.value ?? false;
  }

  /** Access the add-ons controls in the form. */
  public get addOnsControl(): AbstractControl | null {
    return this.form.get('addOns')
  }

  /** Access the selected plan from the form. */
  public get selectedPlan(): Plan | undefined {
    return this.form.get('plan')?.value;
  }

  /** Access the selected add-ons in the form. */
  public get selectedAddOns(): AddOn[] {
    return this.addOnsControl?.value ?? [];
  }

  /** Either add or remove an add-on from the state. */
  public toggleAddOn(addOn: AddOn): void {
    const updated: AddOn[] = this.addOnIsSelected(addOn)
      ? this.selectedAddOns.filter(({ name }) => name !== addOn.name)
      : [...this.selectedAddOns, addOn]

    this.addOnsControl?.setValue(updated);
  }

  /** Helper method to determine whether a field is invalid. */
  public isInvalid(key: string): boolean {
    const input = this.form.get(key);

    if (!input) {
      return false;
    }

    return input.invalid && (input.touched ?? input.dirty);
  }

  /** Helper method to determine whether add-on is selected. */
  public addOnIsSelected(addOn: AddOn): boolean {
    return this.selectedAddOns.map(({ name }: AddOn) => name).includes(addOn.name);
  }

  /** Calculate the total amount of the selected items. */
  public get total(): number {
    const key: keyof Pick<AddOn, 'pricePerMonth' | 'pricePerYear'> = this.yearlyBillingSelected ? 'pricePerYear' : 'pricePerMonth';

    return (this.selectedPlan ? this.selectedPlan[key] : 0) + this.selectedAddOns.reduce((total: number, addOn) => addOn[key] + total, 0);
  }

  constructor() {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(console.log)
  }
}
