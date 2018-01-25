import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GalleryGridComponent } from './gallery-grid.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '../../material.module';
import { MockPhotos } from '../photos.mock';

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
    component.album = MockPhotos;
    fixture.detectChanges();
    expect(component.avgPhotoHeight).toEqual(10);
    expect(component.avgPhotoWidth).toEqual(10);
  }));
});
