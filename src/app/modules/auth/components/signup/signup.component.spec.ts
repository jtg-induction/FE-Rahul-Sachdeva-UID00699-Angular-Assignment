import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { of } from 'rxjs';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let notifier: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'register',
    ]);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    notifier = jasmine.createSpyObj<NotificationService>(
      'NotificationService',
      ['showSuccess']
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
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
    fixture.detectChanges();
  });

  it('should create a new user and redirect to login', () => {
    const signupData = {
      username: 'rahul',
      email: 'rahul@gmail.com',
      password: 'abcd1234!@$%',
      confirmPassword: 'abcd1234!@$%',
    };

    authService.register.and.returnValue(
      of({
        success: true,
        message: 'hey',
        data: {
          id: '1',
          username: 'rahul',
          email: 'rahul@gmail.com',
          createdAt: 'created At',
          updatedAt: 'updated At',
        },
        timestamp: 'timestamp',
      })
    );

    component.form.setValue(signupData);
    component.submit();

    expect(authService.register).toHaveBeenCalledWith(signupData);
    expect(notifier.showSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should be invalid when form is empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
});
