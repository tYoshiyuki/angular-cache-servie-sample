import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SampleUser, SampleUserService } from "./cache/sample-user.service";
import { of } from "rxjs";
import SpyObj = jasmine.SpyObj;

describe('AppComponent', () => {
  let mockService: SpyObj<SampleUserService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<SampleUserService>(["get"]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: SampleUserService, useValue: mockService }
      ]
    }).compileComponents();
  });

  it('初期化出来ること。', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('データが取得出来ること。', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const users = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];

    mockService.get.and.returnValue(of(users));

    // Act
    app.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(app.users).toEqual(users);
  });
});
