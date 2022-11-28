import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedAnimeComponent } from './related-anime.component';

describe('RelatedAnimeComponent', () => {
  let component: RelatedAnimeComponent;
  let fixture: ComponentFixture<RelatedAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedAnimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
