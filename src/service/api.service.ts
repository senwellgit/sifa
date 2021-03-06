import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { LoaderProvider } from './loaderProvider';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // canlogin:any;
  loggedInUserData$ = new BehaviorSubject(null);
  depot$ = new BehaviorSubject(null);
  tanks$ = new BehaviorSubject([]);
  updateFilterSearch$ = new ReplaySubject(1);
  static Token = '';
  static isCordova = false;
  responsedata: any;

  filteredTank$ = this.updateFilterSearch$.pipe(
    withLatestFrom(this.tanks$),
    switchMap(([key, tanks]) => {
      return tanks.filter((option: any) => {
        option.tank_label.toLowerCase().indexOf(key) === 0;
      });
    }),
    startWith([])
  );

  constructor(
    private loading: LoaderProvider,
    private http: HTTP,
    private httpClient: HttpClient
  ) {}

  login(userName: string, password: string) {
    if (!ApiService.isCordova) {
      return new Promise((resolve, rejects) => {
        this.httpClient
          .post('https://sifa-e-lock.cust.bytenetwork.co.uk/api/login', {
            email_or_phone: userName,
            password: password,
          })
          .pipe(
            map((res: any) => {
              res.data = JSON.stringify(res);
              
              //res.status==200?this.canlogin=true:this.canlogin=false;
              resolve(res);
            })
          )
          .subscribe();
      });
    }
    return this.http.post(
      'https://sifa-e-lock.cust.bytenetwork.co.uk/api/login',
      {
        email_or_phone: userName,
        password: password,
      },
      {}
    );
  }

  getDepotAndTank() {
    if (!ApiService.Token) {
      alert('Logout and login again');
      return;
    }
    console.log('###TOKEN###' + ApiService.Token);
    this.loading.showLoader();

    if (!ApiService.isCordova) {
      return new Promise((resolve, rejects) => {
        this.httpClient
          .get(
            'https://sifa-e-lock.cust.bytenetwork.co.uk/api/get-truck-depot-driver-station'
          )
          .pipe(
            map((res: any) => {
              res.data = JSON.stringify(res);
              this.loading.hideLoader();
              this.depot$.next(JSON.parse(res.data).data.depots);
              this.loading.showLoader();
              return res;
            }),
            catchError((e) => {
              
              return of(e);
            }),
            switchMap((res) => {
              return JSON.parse(res.data).data.depots[0].id ?  this.httpClient
                .post(
                  'https://sifa-e-lock.cust.bytenetwork.co.uk/api/get-depot-details',
                  { depot_id: JSON.parse(res.data).data.depots[0].id }
                )
                .pipe(
                  map((resTank: any) => {
                    ;
                    resTank.data = JSON.stringify(resTank);
                    this.tanks$.next(JSON.parse(resTank.data).data.tanks);
                    this.loading.hideLoader();
                    resolve(true);
                  })
                ) : of(null)
            })
          )
          .subscribe();
      }).then((data) => {
        ;
        this.loading.hideLoader();
        console.log('logged');
      });
    }

    this.http
      .get(
        'https://sifa-e-lock.cust.bytenetwork.co.uk/api/get-truck-depot-driver-station',
        {},
        {
          Authorization: `Bearer ${ApiService.Token}`,
        }
      )
      .then((res) => {
        this.loading.hideLoader();
        console.log(res);
        this.depot$.next(JSON.parse(res.data).data.depots);
        this.loading.showLoader();

        return this.http
          .post(
            'https://sifa-e-lock.cust.bytenetwork.co.uk/api/get-depot-details',

            { depot_id: JSON.parse(res.data).data.depots[0].id },
            {
              Authorization: `Bearer ${ApiService.Token}`,
            }
          )
          .then((res) => {
            this.tanks$.next(JSON.parse(res.data).data.tanks);
            this.loading.hideLoader();
          });
      });
  }

  filterTanks(text: any) {
    this.updateFilterSearch$.next(text);
  }

  saveDailyReport(dsr) {
    return this.http.post(
      'https://sifa-e-lock.cust.bytenetwork.co.uk/api/save-surveyor-daily-reports',

      {
        tank_id: dsr.id,
        date_collected: new Date().toDateString(),
        opening_tank_level_mm: dsr.openingTankLevel,
        opening_stock_mega_ton: dsr.openingStocksMtons,
        opening_stock_liter: dsr.openingStocksLtr,
        volume_received_mega_ton: dsr.volumeRecMtons,
        volume_received_liter: dsr.volumeRecLtr,
        h20_liter: dsr.water,
        volume_lifted_mega_ton: dsr.volumneLiftedMtons,
        volume_lifted_liter: dsr.volumneLiftedLtrs,
        closing_tank_level_mm: dsr.closingTankMM,
        closing_stock_mega_ton: dsr.closingStockMtons,
        closing_stock_liter: dsr.closingStockLts,
        dead_stock_liter: dsr.deadStock,
        drop_in_line_liter: dsr.dropInLineLtr,
        drop_in_line_mm: dsr.dropInLineMM,
      },
      {
        Authorization: `Bearer ${ApiService.Token}`,
      }
    );
  }

  saveSSTQR(sstqr: any) {
    if (!ApiService.isCordova) {
      return new Promise((resolve, rejects) => {
        this.httpClient
          .post(
            'https://sifa-e-lock.cust.bytenetwork.co.uk/api/save-surveyor-shoretankquantity-report',

            {
              tank_id: sstqr.id,
              state: 0,
              innage_or_ullage_meter_ft: sstqr.innageMetres,
              free_water_meter_ft: sstqr.freeWatermetres,
              total_observed_cubic_meter: sstqr.totalObservedcubic,
              free_water_cubic_meter: sstqr.freeWatercubic,
              roof_corr_cubic_meter: sstqr.roofCorrncubic,
              gross_observed_cubic_meter: sstqr.grossObservedcubic,
              temperature_deg_c: sstqr.tempC,
              density: sstqr.densityC,
              v_c_f_astm54_b: sstqr.vcfAstm,
              gross_standard_cu_meters: sstqr.grossStandardcu,
              gross_tonnage_mega_ton: sstqr.grosstonnage,
            }
          )
          .pipe(
            map((resTank: any) => {
              resTank.data = JSON.stringify(resTank);
              resolve(resTank);
              this.responsedata = resTank.data;
            })
          )
          .subscribe();
      });
    }

    return this.http.post(
      'https://sifa-e-lock.cust.bytenetwork.co.uk/api/save-surveyor-shoretankquantity-report',

      {
        tank_id: sstqr.id,
        state: 0,
        innage_or_ullage_meter_ft: sstqr.innageMetres,
        free_water_meter_ft: sstqr.freeWatermetres,
        total_observed_cubic_meter: sstqr.totalObservedcubic,
        free_water_cubic_meter: sstqr.freeWatercubic,
        roof_corr_cubic_meter: sstqr.roofCorrncubic,
        gross_observed_cubic_meter: sstqr.grossObservedcubic,
        temperature_deg_c: sstqr.tempC,
        density: sstqr.densityC,
        v_c_f_astm54_b: sstqr.vcfAstm,
        gross_standard_cu_meters: sstqr.grossStandardcu,
        gross_tonnage_mega_ton: sstqr.grosstonnage,
      },
      {
        Authorization: `Bearer ${ApiService.Token}`,
      }
    );
  }

  saveTruck(truckload: any) {
    if (!ApiService.isCordova) {
    }
  }
}
