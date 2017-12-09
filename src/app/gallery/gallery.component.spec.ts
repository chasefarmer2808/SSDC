import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { GalleryComponent } from './gallery.component';
import { FacebookService } from '../services/facebook/facebook.service';
import { MockAlbums } from './albums.mock';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let de: DebugElement;
  let facebookService: FacebookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      imports: [ HttpModule ],
      providers: [ FacebookService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    facebookService = TestBed.get(FacebookService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the facebook service', () => {
    expect(facebookService).toBeTruthy();
  });

  it('should have all albums', () => {
    spyOn(facebookService, 'getAlbums')
      .and.returnValue(Observable.of(MockAlbums));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.albums.length).toEqual(MockAlbums.length);
    })
  });
});
