import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { of } from 'rxjs';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: jasmine.SpyObj<Router>;
  let notifier: jasmine.SpyObj<NotificationService>;
  let authService: jasmine.SpyObj<AuthService>;
  
  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login', 'register']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    notifier = jasmine.createSpyObj<NotificationService>(
      'NotificationService',
      ['showSuccess']
    );

    authService.login.and.returnValue(
      of({
        success: true,
        message: 'test',
        data: {
          user: {
            id: 1,
            username: 'test',
            email: 'test@test.com',
            createdAt: 'temp',
            updatedAt: 'temp',
          },
          token: 'jwt-token',
        },
        timestamp: 'temp',
      })
    );

    authService.register.and.returnValue(
      of({
        success: true,
        message: "registered",
        data: {
          id: "1",
          username: "ready",
          email: "temp@temp.com",
          createdAt: "temp",
          updatedAt: "temp",
        },
        timestamp: "temp",
      })
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButton,
        MatIcon,
      ],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: NotificationService, useValue: notifier },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  it('should create a new user and redirect to login', () => {
    component.form.setValue({
      username: 'rahul',
      email: 'rahul@gmail.com',
      password: 'abcd1234!@#$',
      confirmPassword: 'abcd1234!@#$',
    });

    component.submit();

    expect(notifier.showSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
