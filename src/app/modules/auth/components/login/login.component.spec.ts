import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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

    authService.login.and.returnValue(
      of({
        success: true,
        message: 'test',
        data: {
          user: {
            id: 1,
            username: 'hero',
            email: 'hero@gmail.com',
            createdAt: 'temp',
            updatedAt: 'temp',
          },
          token: 'jwt-token',
        },
        timestamp: 'here',
      })
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
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

  it('logs in successfully and navigates to home', fakeAsync(() => {
    component.form.setValue({
      username: 'test',
      password: '123456',
    });

    component.submit();
    tick();

    expect(authService.login).toHaveBeenCalledWith({
      username: 'test',
      password: '123456',
    });
    expect(notifier.showSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('does not submit if form is invalid', fakeAsync(() => {
    component.form.setValue({
      username: '',
      password: '',
    });

    component.submit();
    tick();

    expect(authService.login).not.toHaveBeenCalled();
    expect(notifier.showSuccess).not.toHaveBeenCalled();
  }));
});
