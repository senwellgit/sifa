import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasualuserDashbordComponent } from './casualuser-dashbord.component';

describe('CasualuserDashbordComponent', () => {
  let component: CasualuserDashbordComponent;
  let fixture: ComponentFixture<CasualuserDashbordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CasualuserDashbordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasualuserDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
