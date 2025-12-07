import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly http: HttpService) {}

  async forward(method: string, url: string, data?: any, headers?: any) {
    const res = await firstValueFrom(
      this.http.request({
        method,
        url,
        data,
        headers,
      }),
    );
    return res.data;
  }
}
