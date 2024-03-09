import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Input,
  Component
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  template: `
    <article class="p-4 rounded-lg border border-2 border-light-gray hover:border-purplish-blue hover:bg-alabaster cursor-pointer duration-300"
             [ngClass]="class"
             [class.border-purplish-blue]="checked"
             [class.bg-alabaster]="checked">
      <ng-content></ng-content>
    </article>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass
  ]
})
export class CardComponent {
  @Input() public class = '';
  @Input({ transform: booleanAttribute }) public checked = false;
}
