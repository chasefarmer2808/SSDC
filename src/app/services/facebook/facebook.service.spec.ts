import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FacebookService } from './facebook.service';

import { environment } from '../../../environments/environment';

describe('FacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientTestingModule ],
      providers: [FacebookService]
    });
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
});
