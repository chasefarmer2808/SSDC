import { TestBed, inject, async } from '@angular/core/testing';
import { HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmailService } from './email.service';
import { Email } from './email';

import { environment } from '../../../environments/environment';

describe('EmailService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));

  it('should send an expected email request', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.sendEmail(mockEmail).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        const body = req.body;
        return req.url === environment.emailUrl
          && req.method === 'POST'
          && body.emailAddress === 'test@test.com'
          && body.firstName === 'John'
          && body.lastName === 'Smith'
          && body.body === 'Hello';
      }, `POST to ${environment.emailUrl} with mock email form information`);
  })));

  it('should emit false for 500 Server Error', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.sendEmail(mockEmail).subscribe((next) => {
        expect(next).toBeFalsy();
      });

      backend.expectOne(environment.emailUrl).flush(null, { status: 500, statusText: 'Server Error'});
  })));

  it('should emit true for 200 OK', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.sendEmail(mockEmail).subscribe((next) => {
        expect(next).toBeTruthy();
      });

      backend.expectOne(environment.emailUrl).flush({ status: 200, statusText: 'ok'});
  })));

  it('should send an expected listserv request', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.addUserToListserv(mockEmail).subscribe();

      backend.expectOne((req: HttpRequest<any>) => {
        const body = req.body;
        return req.url === environment.listservUrl
          && req.method === 'POST'
          && body.emailAddress === 'test@test.com'
          && body.firstName === 'John'
          && body.lastName === 'Smith'
          && body.body === 'Hello';
      }, `POST to ${environment.emailUrl} with mock email form information`);
  })));

  it('should emit false for 500 Server Error', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.addUserToListserv(mockEmail).subscribe((next) => {
        expect(next).toBeFalsy();
      });

      backend.expectOne(environment.listservUrl).flush(null, { status: 500, statusText: 'Server Error'});
  })));

  it('should emit true for 200 OK', async(inject([EmailService, HttpTestingController],
    (service: EmailService, backend: HttpTestingController) => {
      let mockEmail = new Email('test@test.com', 'John', 'Smith', 'Hello');

      service.addUserToListserv(mockEmail).subscribe((next) => {
        expect(next).toBeTruthy();
      });

      backend.expectOne(environment.listservUrl).flush({ status: 200, statusText: 'ok'});
  })));


});
