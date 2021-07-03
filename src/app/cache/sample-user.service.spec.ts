import { TestBed } from '@angular/core/testing';
import { SampleUser, SampleUserService } from './sample-user.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('SampleUserService', () => {
  let controller: HttpTestingController;
  let service: SampleUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SampleUserService);
  });

  it('初期化出来ること。', () => {
    expect(service).toBeTruthy();
  });

  it('データを正しく取得出来ること。', () => {
    // Arrange
    const response = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];

    service.get().subscribe((x) => {
      expect(x).toBe(response);
    });

    const request = controller.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');

    // Act
    request.flush(response);

    // Assert
    controller.verify();
  });

  it('複数回呼び出した場合に、2回目以降キャッシュから取得出来ること。また、データを正しく取得出来ること。', () => {
    // Arrange
    const response = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];

    service.get().subscribe();
    const request = controller.expectOne('https://jsonplaceholder.typicode.com/users');
    request.flush(response);

    // Act
    let result1: SampleUser[] = [];
    let result2: SampleUser[] = [];
    service.get().subscribe((x) => {
      result1 = x;
    });

    service.get().subscribe((x) => {
      result2 = x;
    });

    // Assert
    expect(result1).toBe(response);
    expect(result2).toBe(response);
    controller.verify();
  });
});
