import { Location } from '@angular/common';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';
import { LoaderProvider } from 'src/service/loaderProvider';
@Component({
  selector: 'app-sdr-stepper',
  templateUrl: './sdr-stepper.component.html',
  styleUrls: ['./sdr-stepper.component.scss'],
})
export class SdrStepperComponent implements OnInit {
  loggedUser$ = this.apiService.loggedInUserData$;
  isDisabled = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isLinear = true;

  filteredTanks$ = this.apiService.tanks$;
  selectedTank: any;
  constructor(
    private _formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private loading: LoaderProvider
  ) {
    this.firstFormGroup = this._formBuilder.group({
      depot: [{ value: '', disabled: true }, Validators.required],
      tank: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      openingTankLevel: ['', Validators.required],
      openingStocksMtons: ['', [Validators.required]],
      openingStocksLtr: ['', [Validators.required]],
      volumeRecMtons: ['', [Validators.required]],
      volumeRecLtr: ['', [Validators.required]],
    });
    this.thirdFormGroup = this._formBuilder.group({
      volumneLiftedMtons: ['', Validators.required],
      volumneLiftedLtrs: ['', Validators.required],
      closingTankMM: ['', Validators.required],
      closingStockMtons: ['', Validators.required],
      closingStockLts: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      deadStock: ['', Validators.required],
      dropInLineLtr: ['', Validators.required],
      dropInLineMM: ['', Validators.required],
      water: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apiService.depot$.subscribe((data) => {
      if (!data) {
        return
      }
      this.firstFormGroup.controls.depot.patchValue(data[0].name);
    });

    this.firstFormGroup.get('tank').valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.apiService.filterTanks(value);
      })
    );
  }

  onTankChange(value: string, allTanks: any[]) {
    this.selectedTank = allTanks.find(
      (t) => t.tank_label.toLowerCase() === value.toLowerCase()
    );
  }

  goBack() {
    this.location.back();
  }

  saveDSR() {
    this.loading.showLoader();
    this.apiService
      .saveDailyReport({
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.thirdFormGroup.value,
        ...this.fourthFormGroup.value,
        ...this.selectedTank,
      })
      .then((res: any) => {
        this.loading.hideLoader();

        if (JSON.parse(res.data).status == 200) {
          alert('Report has been submitted.');
          this.router.navigateByUrl('survayer-dashboard');
        } else {
          alert('Something went wrong.');
        }
      });
  }

  onInputChange(event, fcName, fName) {
    const abc = this[fName].get(fcName).value;
    this[fName].get(fcName).patchValue(abc.toLocaleString());
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
