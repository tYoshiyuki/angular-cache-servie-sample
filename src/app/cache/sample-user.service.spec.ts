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

  it('データを正しく取得出来ること。', async () => {
    // Arrange
    const response = [{
      id: 1,
      name: "name001",
      email: "email001@test.com",
      phone: "001-001-001",
    }] as SampleUser[];

    const promise = service.get().toPromise();
    const request = controller.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(request.request.method).toBe('GET');

    // Act
    request.flush(response);

    // Assert
    expect(await promise).toBe(response);
    controller.verify();
  });

  it('複数回呼び出した場合に、2回目以降キャッシュから取得出来ること。また、データを正しく取得出来ること。', async () => {
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
    const promise1 = service.get().toPromise();
    const promise2 = service.get().toPromise();

    // Assert
    expect(await promise1).toBe(response);
    expect(await promise2).toBe(response);
    controller.verify();
  });
});
