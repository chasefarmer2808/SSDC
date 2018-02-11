import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModule } from '../../../modules/material.module';
import { ImageDialogComponent } from './image-dialog.component';

import { MockPhotos } from '../../photos.mock';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;

  function triggerDocumentEvent(eventName:string, eventObj:any) {
    let event = new Event(eventName, eventObj);
    document.dispatchEvent(event);
  }

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

  it('should initialize to the first photo in the album list', () => {
    expect(component.selectedPhoto).toEqual(MockPhotos[component.selectedPhotoIndex]);
  });

  it('should be on first photo initially', () => {
    expect(component.firstPhotoSelected()).toBeTruthy();
  });

  it('should not be on last photo initially', () => {
    expect(component.lastPhotoSelected()).toBeFalsy();
  });

  it('should not go to previous photo if on first photo', () => {
    spyOn(component, 'firstPhotoSelected').and.returnValue(true);
    component.prevPhoto()

    expect(component.firstPhotoSelected).toHaveBeenCalled();
    expect(component.selectedPhotoIndex).toEqual(0);
  });

  it('should go to next photo if on first photo', () => {
    spyOn(component, 'lastPhotoSelected').and.returnValue(false);
    component.nextPhoto();

    expect(component.lastPhotoSelected).toHaveBeenCalled();
    expect(component.selectedPhotoIndex).toEqual(1);
  });

  it('should go to next photo if right arrow key pressed', () => {
    let indexBeforeEvent:number = component.selectedPhotoIndex;

    triggerDocumentEvent('keyup.arrowright', null);

    expect(component.selectedPhotoIndex).toEqual(indexBeforeEvent + 1);
  });

  it('should go to previous photo if left arrow key pressed', () => {

  });
});
