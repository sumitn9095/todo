import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TokenInterceptor } from './utility/token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './utility/auth.guard';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TaskApiState } from './shared/task.state';
// import { ChildComponent } from './change-detection-with-signal/child/child.component';
// import { SharedModule } from './shared/shared.module'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxsModule.forRoot([
      TaskApiState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
    //SharedModule
  ],
  // exports: [ChildComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
