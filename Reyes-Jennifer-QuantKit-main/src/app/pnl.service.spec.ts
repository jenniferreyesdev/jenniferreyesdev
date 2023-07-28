import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PnlService } from './pnl.service';

describe('PnlService', () => {
  let service: PnlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PnlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
