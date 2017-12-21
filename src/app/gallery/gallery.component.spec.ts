import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { GalleryComponent } from './gallery.component';
import { FacebookService } from '../services/facebook/facebook.service';
import { MockAlbums } from './albums.mock';
import { MockPhotos } from './photos.mock';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let de: DebugElement;
  let facebookService: FacebookService;
  let getAlbumsSpy: any;
  let getAlbumSpy: any;

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
    facebookService = de.injector.get(FacebookService);
    
    getAlbumsSpy = spyOn(facebookService, 'getAlbums')
                    .and.returnValue(Observable.of(MockAlbums));

    getAlbumSpy = spyOn(facebookService, 'getAlbum')
                    .and.returnValue(Observable.of(MockPhotos));

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the facebook service', () => {
    expect(facebookService).toBeTruthy();
  });

  it('should have all albums', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.albums.length).toEqual(MockAlbums.length);
    })
  });
});
