import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteCoinsComponent } from './autocomplete-coins.component';

describe('AutocompleteCoinsComponent', () => {
  let component: AutocompleteCoinsComponent;
  let fixture: ComponentFixture<AutocompleteCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteCoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
