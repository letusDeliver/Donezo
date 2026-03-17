import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

// BEST LIGHT THEME
import Lara from '@primeng/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({
      eventCoalescing: true,
    }),

    provideRouter(routes),

    // ✅ Enable animations (important for dropdowns, ripple, UI feel)
    provideAnimations(),

    // ✅ PrimeNG setup
    providePrimeNG({
      ripple: true,

      theme: {
        preset: Lara,

        options: {
          darkModeSelector: false, // 🔥 force light theme
        },
      },
    }),
  ],
};