import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '../../../material.module';
import { ImageDialogComponent } from './image-dialog.component';

import { MockPhotos } from '../../photos.mock';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDialogComponent ],
      imports: [ MaterialModule ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            index: 0,
            photos: MockPhotos
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
