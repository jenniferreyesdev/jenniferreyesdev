import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService',['signIn']);
    routerSpy = jasmine.createSpyObj('Router',['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy},
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting a log-in form authenticates a user, then redirects user to personal dashboard', () => {
    const formData = {
      "username": "jenniferreyesdev@gmail.com",
      "password": "Titp8*8*8*"
    };
    component.loginForm.setValue(formData);
    component.signIn();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
  })
});