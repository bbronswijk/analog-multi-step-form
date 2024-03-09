import {
  ChangeDetectionStrategy,
  Component, input
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  template: `
    <a [routerLink]="routerLink()" class="grid grid-cols-[auto_1fr] gap-x-4 items-center">
      <div class="border h-8 w-8 font-bold text-sm flex items-center justify-center rounded-full row-span-2 duration-300"
           #routerLinkActive="routerLinkActive"
           [ngClass]="{
                'text-marine-blue bg-light-blue border-light-blue': routerLinkActive.isActive,
                'text-white border-white': !routerLinkActive.isActive
              }"
           routerLinkActive="text-marine-blue bg-light-blue border-light-blue">{{ index() }}</div>
      <small class="text-light-gray text-xs uppercase hidden md:block">STEP {{ index() }}</small>
      <strong class="text-white text-sm tracking-wide hidden md:block">
        <ng-content/>
      </strong>
    </a>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgStyle,
    RouterLink,
    RouterLinkActive
  ]
})
export class MenuItemComponent {
  public routerLink = input.required<string>()
  public index = input.required<number>()
}
