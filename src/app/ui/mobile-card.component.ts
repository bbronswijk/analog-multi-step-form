import {
  ChangeDetectionStrategy,
  Component, Input
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mobile-card',
  template: `
    <section class="-mt-24 md:mt-0 p-10 md:p-0 bg-white rounded-lg shadow-2xl md:shadow-none" [ngClass]="class">
      <ng-content></ng-content>
    </section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass
  ]
})
export class MobileCardComponent {
  @Input() public class = '';
}
