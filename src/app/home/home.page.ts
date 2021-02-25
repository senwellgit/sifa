import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/service/api.service';
import { LoaderProvider } from 'src/service/loaderProvider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  passwordType = 'password';
  passwordIcon = 'eye-off';
  loginForm: FormGroup;
  cell1TelInput = {
    initialCountry: 'GBP',
    separateDialCode: true,
  };
  phoneInValid: boolean = false;
  isCaptchaClickable = true;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    public loading: LoaderProvider
  ) {}

  ngOnInit() {
    this.validateLoginForm();
  }

  toggleViewPassword(): void {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye' ? 'eye-off' : 'eye';
  }

  onSubmit(value: any, valid: boolean) {
    if (valid) {
      this.loading.showLoader();
      this.apiService
        .login(value.phoneNumber, value.password)
        .then((loggedInDetails: any) => {
          const parsedResponse = JSON.parse(loggedInDetails.data);
          ;
          if (loggedInDetails.status === 200) {
            ApiService.Token = parsedResponse.data.token;
            localStorage.setItem('user', loggedInDetails.data);

            this.apiService.loggedInUserData$.next(loggedInDetails.data);
            this.apiService.getDepotAndTank();
            if (parsedResponse.data.role_name === 'depot_manager') {
              this.router.navigateByUrl('depotsuser-dashboard');
            }
            if (parsedResponse.data.role_name === 'depot_surveyor') {
              this.router.navigateByUrl('survayer-dashboard');
            }
            //   this.router.navigateByUrl('surveyor-dashboard');
            //
            //   this.router.navigateByUrl('stationmanager-dashbord');
            // this.router.navigateByUrl('casualuser-dashboard');
          } else {
            alert(loggedInDetails.message);
            ;
          }
        });
    }
  }

  private validateLoginForm() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }
}
