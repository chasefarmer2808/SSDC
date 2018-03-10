import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FacebookService } from './facebook.service';
import { EventsMock } from '../../events/events.mock';
import { AlbumsMock } from '../../gallery/albums.mock';
import { PhotosMock } from '../../gallery/photos.mock';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

describe('FacebookService', () => {

  let service: FacebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientTestingModule ],
      providers: [FacebookService]
    })
    .compileComponents();

    service = TestBed.get(FacebookService);
  });

  it('should be created', inject([FacebookService], (service: FacebookService) => {
    expect(service).toBeTruthy();
  }));

  it('should create GET request for getEvents', async(inject([FacebookService, HttpTestingController],
    (service: FacebookService, backend: HttpTestingController) => {

      service.getEvents().subscribe();

      backend.expectOne({
        url: `${environment.facebookUrl}/getEvents`,
        method: 'GET'
      });

  })));

  it('should create GET request for getAlbums', async(inject([FacebookService, HttpTestingController],
    (service: FacebookService, backend: HttpTestingController) => {

      service.getAlbums().subscribe();

      backend.expectOne({
        url: `${environment.facebookUrl}/albums`,
        method: 'GET'
      });

  })));

  it('should create GET request for getAlbum', async(inject([FacebookService, HttpTestingController],
    (service: FacebookService, backend: HttpTestingController) => {

      let albumId:string = '0';

      service.getAlbum(albumId).subscribe();

      backend.expectOne({
        url: `${environment.facebookUrl}/album/${albumId}`,
        method: 'GET'
      });

  })));

  it('should get all events', () => {
    let getEventsSpy = spyOn(service, 'getEvents')
                        .and.returnValue(Observable.of(EventsMock));

    service.getEvents().subscribe(events => {
      expect(events).toEqual(EventsMock);
    });
  });

  it('should get all albums', () => {
    let getAlbumsSpy = spyOn(service, 'getAlbums')
                        .and.returnValue(Observable.of(AlbumsMock));

    service.getAlbums().subscribe(albums => {
      expect(albums).toEqual(AlbumsMock);
    });
  });

  it('should get all photos', () => {
    let getPhotosSpy = spyOn(service, 'getAlbum')
                        .and.returnValue(Observable.of(PhotosMock));

    service.getAlbum('1').subscribe(photos => {
      expect(photos).toEqual(PhotosMock);
    });
  });
});
