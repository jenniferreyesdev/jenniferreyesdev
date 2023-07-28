import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loginObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService',['isAuthenticated','signOut']);
    authServiceSpy.isAuthenticated.and.returnValue(loginObservable);
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    loginObservable.next(false);
  })

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it(`an unauthenticated user should see a navbar with links for Home, Developer Bios,  
      and Login that have routerLink properties set to to the correct routes`,()=>{
    let links = fixture.nativeElement.querySelectorAll('a');
    
    //branding

    expect(links[0].getAttribute('href')).toEqual("#");

    expect(links[1].textContent).toEqual('Home');
    expect(links[1].getAttribute('routerLink')).toEqual('/home');

    expect(links[2].textContent).toEqual('Pricing');
    expect(links[2].getAttribute('routerLink')).toEqual('/pricing');

    expect(links[3].textContent).toEqual('Docs');
    expect(links[3].getAttribute('routerLink')).toEqual('/docs');

    expect(links[4].textContent).toEqual('Services');

    expect(links[5].textContent).toEqual('Trading');
    expect(links[5].getAttribute('routerLink')).toEqual('/trading');

    expect(links[6].textContent).toEqual('Hedging');
    expect(links[6].getAttribute('routerLink')).toEqual('/hedging');

    expect(links[7].textContent).toEqual('Risk');
    expect(links[7].getAttribute('routerLink')).toEqual('/risk');

    expect(links[8].textContent).toEqual('Log-In');
    expect(links[8].getAttribute('routerLink')).toEqual('/login');

    expect(links.length).toEqual(9);
  });
  
  it('login link should change to logout when a user logs in, and back to login if a user clicks the logout link',async()=>{
    loginObservable.next(true);
    await fixture.whenStable();//async operation subscription broadcast
    fixture.detectChanges();//change of ngIf
    let logOut = fixture.nativeElement.querySelector('[data-test-id="logOut"]');
    
    expect(logOut).toBeTruthy();
    expect(logOut.textContent).toEqual("Logout");

    //logout
    logOut.dispatchEvent(new Event('click'));
    loginObservable.next(false);
    await fixture.whenStable();//async operation subscription broadcast
    fixture.detectChanges();//change of ngIf

    //try to access hidden links
    logOut = fixture.nativeElement.querySelector('[data-test-id="logOut"]');
    
    expect(authServiceSpy.signOut).toHaveBeenCalled();
    expect(logOut).toBeFalsy();
  });

});
