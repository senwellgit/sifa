import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';
import { LoaderProvider } from 'src/service/loaderProvider';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-sstqr-stepper',
  templateUrl: './sstqr-stepper.component.html',
  styleUrls: ['./sstqr-stepper.component.scss'],
})
export class SstqrStepperComponent implements OnInit {
  opetions = ['open', 'close'];
  loggedUser$ = this.apiService.loggedInUserData$.pipe(
    map((res) => {
      if (!res) {
        return '';
      }
      res = JSON.parse(res);
      return res;
    })
  );
  isDisabled = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isLinear = true;
  filteredTanks$ = this.apiService.tanks$;
  selectedTank: any;
  sstqrresponse: any;
  data: any;
  isReportDone: boolean;
  closingStock: any;
  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private loading: LoaderProvider
  ) {
    this.firstFormGroup = this._formBuilder.group({
      tankState: ['', Validators.required],
      depot: [{ value: '', disabled: true }, Validators.required],
      tank: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      innageMetres: ['', Validators.required],
      freeWatermetres: ['', Validators.required],
      totalObservedcubic: ['', [Validators.required]],
      freeWatercubic: ['', [Validators.required]],
      roofCorrncubic: ['', [Validators.required]],
      grossObservedcubic: ['', [Validators.required]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      tempC: ['', Validators.required],
      densityC: ['', Validators.required],
      vcfAstm: ['', Validators.required],
      grossStandardcu: ['', Validators.required],
      grosstonnage: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apiService.depot$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.firstFormGroup.controls.depot.patchValue(data[0].name);
    });

    this.firstFormGroup.get('tankState').valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.apiService.filterTanks(value);
      })
    );
  }

  onTankChange(value: string, allTanks: any[]) {
    this.selectedTank = allTanks.find((t) => t.tank_label === value);
  }

  goBack() {
    this.location.back();
  }

  saveSSTQR(stepper: any) {
    this.loading.showLoader();
    this.apiService
      .saveSSTQR({
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.selectedTank,
      })
      .then((res: any) => {
        this.loading.hideLoader();
        if (JSON.parse(res.data).status == 200) {
          debugger;
          alert('Shore Report has been submitted.');
          this.sstqrresponse = this.apiService.responsedata;
          this.isReportDone = true;
          this.closingStock = JSON.parse(res.data).data[0];
          stepper.selected.completed = true;
          stepper.selected.editable = false;
          stepper.next();
        } else {
          alert('Something went wrong.');
        }
      });
  }

  goBackToDash() {
    this.router.navigateByUrl('survayer-dashboard');
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
