import { NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  providers: [provideRouter(routes)],
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
