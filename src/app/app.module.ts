import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
        { path: '', redirectTo: 'customer', pathMatch: 'full' },
        {
          path: 'customer',
          loadChildren: () =>
            import('./customer/customer.module').then((m) => m.CustomerModule),
        }
]


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  bootstrap:[AppComponent]
})
export class AppModule {}

