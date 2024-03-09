import { Component } from '@angular/core';
import { MobileCardComponent } from '../ui/mobile-card.component';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  template: `
    <app-mobile-card class="h-full py-20 md:py-0">
      <div class="flex flex-col gap-4 justify-center h-full text-center h-full">
        <img alt="Thank you" class="mx-auto" src="/images/icon-thank-you.svg"  width="80" height="80"/>
        <h1 class="font-bold text-4xl text-marine-blue">Thank you!</h1>
        <p class="text-cool-gray pt-2 pb-8">
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support&#64;loremgaming.com.
        </p>
      </div>
    </app-mobile-card>
  `,
  imports: [
    MobileCardComponent
  ]
})
export default class ThankYouPage {}
