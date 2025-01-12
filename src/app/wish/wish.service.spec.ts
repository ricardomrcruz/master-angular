import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WishService } from './wish.service';
import { WishItem } from '../../shared/models/whishItem';

describe('WishService', () => {
  let service: WishService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WishService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(WishService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get wishes with correct parameters', () => {
    // Create the response data as a plain object
    const responseData = [
      { wishText: 'To Learn Angular', isComplete: false },
      { wishText: 'Get some coffee', isComplete: true },
      { wishText: 'Find grass that cuts itself', isComplete: false }
    ];

    service.getWishes().subscribe({
      next: (data: any) => {
        expect(data).toEqual(responseData);
      },
      error: (error) => {
        fail('Should not have failed');
      }
    });

    const req = httpMock.expectOne(request =>
      request.url === '/assets/wishes.json' &&
      request.params.get('format') === 'json'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-type')).toBe('application/json');

    // Use plain object for response
    req.flush(responseData as any);
  });

  it('should handle error when getting wishes fails', () => {
    service.getWishes().subscribe({
      next: () => {
        fail('Should have failed');
      },
      error: (error) => {
        expect(error.message).toBe('Cannot retrieve wishes from the server. Please try again.');
      }
    });

    const req = httpMock.expectOne(request => request.url === '/assets/wishes.json');
    req.error(new ProgressEvent('error'));
  });

  it('should add wish with correct headers', () => {
    const wish = new WishItem('New Test Wish');

    service.addWish(wish);

    const req = httpMock.expectOne('assets/wishes.json');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe('value-need-for-authorization');

    req.flush({} as any);
  });
});