import {
  ChangeDetectionStrategy,
  Component,
  effect, HostListener,
  input,
  signal
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  template: `
    <label [for]="formControlName()" class="flex text-sm py-1.5 text-marine-blue">
      {{ label() }}
      <span *ngIf="invalid()" class="text-strawberry-red ml-auto">This field is required</span>
    </label>
    <input [id]="formControlName()"
           [(ngModel)]="value"
           class="border border-light-gray w-full rounded-lg p-3 focus-visible:outline focus-visible:border-purplish-blue duration-300"
           [class.border-strawberry-red]="invalid()"
           [placeholder]="placeholder()"/>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InputComponent implements ControlValueAccessor {
  public formControlName = input.required<string>();
  public label = input.required<string>();
  public placeholder = input.required<string>();
  public invalid = input.required<boolean>();

  public value = signal('');

  constructor() {
    effect(() => this.onChange(this.value()));
  }

  /** Register the local onChange methods. */
  public onChange = (value: string): void => {};

  @HostListener('click')
  public onTouched = (): void => {};

  /** Function to allow angular to register the change method. */
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /** Function to allow angular to register the touched method. */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Allow the angular form to be filled from the parent component. */
  public writeValue(value: string): void {
    this.value.set(value);
  }
}
