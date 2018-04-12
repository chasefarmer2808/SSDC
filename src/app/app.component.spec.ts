import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { RouteDataFilterPipe } from './pipes/route-data-filter/route-data-filter.pipe';
import { RouteGuardFilterPipe } from 'app/pipes/route-guard-filter/route-guard-filter.pipe';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from 'app/services/auth/auth.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        RouteDataFilterPipe,
        RouteGuardFilterPipe
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        Ng2PageScrollModule,
        HttpModule,
        HttpClientModule
      ],
      providers: [ AuthService ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
