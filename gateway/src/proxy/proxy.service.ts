import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ProxyService {
  constructor(private readonly http: HttpService) {}

  async forward(method: string, url: string, data?: any, headers?: any) {
    try {
      // Filter headers yang diperlukan
      const filteredHeaders: any = {};
      
      if (headers) {
        // Copy important headers
        if (headers.authorization) {
          filteredHeaders.authorization = headers.authorization;
        }
        if (headers['content-type']) {
          filteredHeaders['content-type'] = headers['content-type'];
        }
      }

      console.log(`[ProxyService] Forwarding ${method} to ${url}`);
      if (data) {
        console.log(`[ProxyService] Request body:`, JSON.stringify(data).substring(0, 200));
      }

      const response = await firstValueFrom(
        this.http.request({
          method,
          url,
          data,
          headers: filteredHeaders,
          timeout: 10000, // 10 second timeout
        }),
      );

      return response.data;
    } catch (error) {
      console.error(`[ProxyService] Error forwarding to ${url}:`, error.message);
      
      if (error.response) {
        console.error(`[ProxyService] Response status:`, error.response.status);
        console.error(`[ProxyService] Response data:`, error.response.data);
      }
      
      throw error;
    }
  }
}