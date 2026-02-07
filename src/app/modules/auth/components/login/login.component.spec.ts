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

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let notifier: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    notifier = jasmine.createSpyObj<NotificationService>(
      'NotificationService',
      ['showSuccess']
    );

    authService.login.and.returnValue(of({ token: 'jwt-token' }));

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
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: NotificationService, useValue: notifier },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('logs in successfully and navigates to home', () => {
    component.form.setValue({
      username: 'test',
      password: '123456',
    });

    component.submit();

    expect(authService.login).toHaveBeenCalled();
    expect(notifier.showSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
