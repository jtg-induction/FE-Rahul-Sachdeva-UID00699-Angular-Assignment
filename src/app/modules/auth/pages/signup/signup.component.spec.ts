import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ValidatorService } from '@core/services/validator.service';
import { of } from 'rxjs';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let validatorService: jasmine.SpyObj<ValidatorService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'register',
      'login',
    ]);

    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    validatorService = jasmine.createSpyObj<ValidatorService>(
      'ValidatorService',
      ['alphaNumeric', 'passwordMatch']
    );

    validatorService.alphaNumeric.and.returnValue(() => null);
    validatorService.passwordMatch.and.returnValue(() => null);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ValidatorService, useValue: validatorService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const validForm = {
    username: 'rahul',
    email: 'rahul@test.com',
    password: 'Password11@@',
    confirmPassword: 'Password11@@',
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.submit();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should register and login successfully', () => {
    component.form.setValue(validForm);

    authService.register.and.returnValue(
      of({
        success: true,
        message: 'Login Success',
        data: {
          id: '1',
          username: 'rahul',
          email: 'rahul@test.com',
          createdAt: 'temp',
          updatedAt: 'temp',
        },
        timestamp: 'temp',
      })
    );

    authService.login.and.returnValue(
      of({
        success: true,
        message: 'Login Success',
        data: {
          user: {
            id: '1',
            username: 'rahul',
            email: 'rahul@test.com',
            createdAt: 'temp',
            updatedAt: 'temp',
          },
          token: 'jwt-token',
        },
        timestamp: 'temp',
      })
    );

    spyOn(localStorage, 'setItem');

    component.submit();

    expect(authService.register).toHaveBeenCalledWith(validForm);
    expect(authService.login).toHaveBeenCalledWith(validForm);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'jwt-token');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set loading true during submit', () => {
    component.form.setValue(validForm);

    authService.register.and.returnValue(
      of({
        success: true,
        message: 'Registered',
        data: {
          id: '1',
          username: 'rahul',
          email: 'rahul@test.com',
          createdAt: 'temp',
          updatedAt: 'temp',
        },
        timestamp: 'temp',
      })
    );

    authService.login.and.returnValue(
      of({
        success: true,
        message: 'Login Success',
        data: {
          user: {
            id: '1',
            username: 'rahul',
            email: 'rahul@test.com',
            createdAt: 'temp',
            updatedAt: 'temp',
          },
          token: 'jwt-token',
        },
        timestamp: 'temp',
      })
    );

    component.submit();

    expect(component.loading).toBeFalse();
  });

  it('should auto-hide password when typing', () => {
    component.hide = false;
    component.form.get('password')?.setValue('newPass');
    expect(component.hide).toBeTrue();
  });

  it('should auto-hide confirm password when typing', () => {
    component.hide2 = false;
    component.form.get('confirmPassword')?.setValue('newPass');
    expect(component.hide2).toBeTrue();
  });
});
