import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabStatsComponent } from './tab-stats.component';

describe('TabStatsComponent', () => {
  let component: TabStatsComponent;
  let fixture: ComponentFixture<TabStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
