import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <div class="rounded-full p-1 bg-marine-blue flex w-10 cursor-pointer" (click)="toggle()">
      <span class="rounded-full bg-white h-3 w-3 duration-200" [class.translate-x-5]="value()"></span>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SlideToggleComponent,
      multi: true,
    },
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgClass
  ]
})
export class SlideToggleComponent implements ControlValueAccessor {
  public value = signal(false);

  /** Register the local onChange methods. */
  public onChange = (value: boolean): void => {};
  public onTouched = (): void => {};

  /** Function to allow angular to register the change method. */
  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /** Function to allow angular to register the touched method. */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  constructor() {
    effect(() => this.onChange(this.value()));
  }

  /** Toggle the form value. */
  public toggle(): void {
    this.value.update(value => !value);
  }

  /** Allow the angular form to be filled from the parent component. */
  public writeValue(value: boolean): void {
    this.value.set(value);
  }
}
