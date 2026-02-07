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

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let router: jasmine.SpyObj<Router>;
  let notifier: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    notifier = jasmine.createSpyObj<NotificationService>(
      'NotificationService',
      ['showSuccess']
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
        { provide: AuthService, useClass: AuthServiceMock },
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
      password: 'abcd1234',
      confirmPassword: 'abcd1234',
    });

    component.submit();

    expect(notifier.showSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
