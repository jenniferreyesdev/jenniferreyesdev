import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TradingComponent } from './trading.component';

describe('TradingComponent', () => {
  let component: TradingComponent;
  let fixture: ComponentFixture<TradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
