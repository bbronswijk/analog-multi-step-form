import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer
      class="flex justify-between bg-white fixed md:relative left-0 right-0 bottom-0 p-4 md:p-0 items-center gap-2">
      <ng-content/>
    </footer>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
