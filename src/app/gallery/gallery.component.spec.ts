import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MaterialModule } from '../modules/material.module';
import 'rxjs/Rx';

import { GalleryComponent } from './gallery.component';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { FacebookService } from '../services/facebook/facebook.service';
import { AlbumsMock } from './albums.mock';
import { PhotosMock } from './photos.mock';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let de: DebugElement;
  let facebookService: FacebookService;
  let getAlbumsSpy: any;
  let getAlbumSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, GalleryGridComponent ],
      imports: [ HttpModule, MaterialModule, HttpClientModule ],
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
                    .and.returnValue(Observable.of(AlbumsMock));

    getAlbumSpy = spyOn(facebookService, 'getAlbum')
                    .and.returnValue(Observable.of(PhotosMock));

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
      expect(component.albums.length).toEqual(AlbumsMock.length);
    })
  });

  it('should select first album in album array', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.selectedAlbumName).toEqual(AlbumsMock[0].name);
    });
  });

  it('should display selected album name', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let galleryGridTitle = fixture.nativeElement.querySelector('.gallery-grid-title');
      expect(galleryGridTitle.innerHTML).toEqual(component.selectedAlbumName);
    });
  });

  it('should show right scroll arrow and hide left scroll arrow on init', () => {
    fixture.detectChanges();
    expect(component.rightArrowVisible).toBeTruthy();
    expect(component.leftArrowVisible).toBeFalsy();
  });
});
