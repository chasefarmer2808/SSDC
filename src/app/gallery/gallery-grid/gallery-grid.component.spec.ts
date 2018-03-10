import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GalleryGridComponent } from './gallery-grid.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '../../modules/material.module';
import { PhotosMock } from '../photos.mock';

describe('GalleryGridComponent', () => {
  let component: GalleryGridComponent;
  let fixture: ComponentFixture<GalleryGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryGridComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryGridComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set averages on input change', async(() => {
    component.album = PhotosMock;
    fixture.detectChanges();
    expect(component.avgPhotoHeight).toEqual(10);
    expect(component.avgPhotoWidth).toEqual(10);
  }));

  it('should call resetDimentions on init', async(() => {
    let resetDimentionsSpy = spyOn(component, 'resetDimentions').and.callThrough();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(resetDimentionsSpy).toHaveBeenCalled();
    });
  }));

  it('should reset avg width and avg height to 0', () => {
    component.avgPhotoWidth = 10;
    component.avgPhotoHeight = 10;
    component.resetDimentions();
    expect(component.avgPhotoWidth).toEqual(0);
    expect(component.avgPhotoHeight).toEqual(0);
  });
});
