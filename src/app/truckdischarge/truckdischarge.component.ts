import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';
import { LoaderProvider } from 'src/service/loaderProvider';
@Component({
  selector: 'app-truckdischarge',
  templateUrl: './truckdischarge.component.html',
  styleUrls: ['./truckdischarge.component.scss'],
})
export class TruckdischargeComponent implements OnInit {
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;

  constructor(private router: Router,
    private location: Location,
    private apiService: ApiService,
    private fb: FormBuilder,
    private loading: LoaderProvider
  ) {
    this.firstFormGroup = this.fb.group({
      waybillno: ['', Validators.required],
     // dischargeVuchernumber: ['', Validators.required],
      stationName: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      truckLicensenumber: ['', Validators.required],
      truckDriver: ['', [Validators.required]],
      volumeLoadedatdepot: ['', [Validators.required]],
    //  compartment: ['', [Validators.required]],
      //bottomLock: ['', [Validators.required]],
      //pitDeliveredto: ['', [Validators.required]],
    });
  
  }

  ngOnInit() { }
  goBack() {
    this.location.back();
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
