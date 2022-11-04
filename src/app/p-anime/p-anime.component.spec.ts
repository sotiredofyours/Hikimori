import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAnimeComponent } from './p-anime.component';

describe('PAnimeComponent', () => {
  let component: PAnimeComponent;
  let fixture: ComponentFixture<PAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PAnimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
