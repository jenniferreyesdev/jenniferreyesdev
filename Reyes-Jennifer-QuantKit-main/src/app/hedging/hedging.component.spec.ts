import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HedgingComponent } from './hedging.component';

describe('HedgingComponent', () => {
  let component: HedgingComponent;
  let fixture: ComponentFixture<HedgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HedgingComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HedgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
