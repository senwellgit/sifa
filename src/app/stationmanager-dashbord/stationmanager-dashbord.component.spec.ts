import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StationmanagerDashbordComponent } from './stationmanager-dashbord.component';

describe('StationmanagerDashbordComponent', () => {
  let component: StationmanagerDashbordComponent;
  let fixture: ComponentFixture<StationmanagerDashbordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StationmanagerDashbordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StationmanagerDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
