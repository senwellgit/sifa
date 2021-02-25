import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';
import { LoaderProvider } from 'src/service/loaderProvider';
import { of } from 'rxjs';

@Component({
  selector: 'app-truck-load',
  templateUrl: './truck-load.component.html',
  styleUrls: ['./truck-load.component.scss'],
})
export class TruckLoadComponent implements OnInit {
  pipe = new DatePipe('en-US');
  now = Date.now();
  mySimpleFormat = this.pipe.transform(this.now, 'MM/dd/yyyy');
  isLinear = true;
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;
  filteredTanks$ = this.apiService.tanks$;
  selectedTank: any;

  loggedUser$ = this.apiService.loggedInUserData$.pipe(
    map((res) => {
      if (!res) {
        return '';
      }
      res = JSON.parse(res);
      return res;
    })
  );
  filteredTanks4$ = of(['d1', 'd2', 'd3', 'd4']);
  filteredTanks1$ = of(['mumbai', 'nagpur', 'pune']);
  filteredTanks2$ = of(['liquid height', 'ullage', 'volume']);
  //filteredTanks3$ = this.apiService.tanks$;

  constructor(
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private fb: FormBuilder,
    private loading: LoaderProvider
  ) {
    this.firstFormGroup = this.fb.group({
      depotName: [{value:''}, Validators.required],
      depotTank: ['', [Validators.required]],
      destination: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      reciptNumber: ['', Validators.required],
      meterticketnumberlpdnumber: ['', [Validators.required]],
      currentDate: [{ value: this.mySimpleFormat, disabled: true },[Validators.required]],
      lpdNumber: ['', [Validators.required]],
    });
    this.thirdFormGroup = this.fb.group({
      truckLicenseNumber: ['',[Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      truckDriver: ['', Validators.required],
      volumeLoadeatdepot: ['', Validators.required],
      liquidHeight: ['', Validators.required],
      ullage: ['', Validators.required],
      volume: ['', Validators.required],
      liquidHeight1: ['', Validators.required],
      ullage1: ['', Validators.required],
      volume1: ['', Validators.required],
      
    });
  }

  ngOnInit() {
   
    this.apiService.depot$.subscribe((data) => {
      if (!data) {
        return
      }
      this.firstFormGroup.controls.depotName.patchValue(data[0].name);
    });

    this.firstFormGroup.get('depotTank').valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.apiService.filterTanks(value);
      })
    );
  }

  saveTruckLoad() {
    this.loading.showLoader();
    this.apiService.saveTruck({
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    });
    // .then((res: any) => {
    //   this.loading.hideLoader();

    //   if (JSON.parse(res.data).status == 200) {
    //     alert('Report has been submitted.');
    //     this.router.navigateByUrl('survayer-dashboard');
    //   } else {
    //     alert('Something went wrong.');
    //   }
    // });
  }

  onTankChange(value: string, allTanks: any[]) {
    this.selectedTank = allTanks.find(
      (t) => t.tank_label.toLowerCase() === value.toLowerCase()
    );
  }
  goBack() {
    this.location.back();
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
