import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { MenuComponent } from './ui/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle, NgClass, MenuComponent],
  template: `
    <main class="md:rounded-xl md:shadow-2xl md:bg-white md:p-4 md:grid md:grid-cols-[auto_1fr] max-w-full md:mx-4 md:w-[960px] md:h-[600px]">
      <app-menu/>

      <section class="px-4 md:px-12 lg:px-24 pt-10 pb-3">
        <router-outlet/>
      </section>
    </main>

  `,
})
export class AppComponent {}
