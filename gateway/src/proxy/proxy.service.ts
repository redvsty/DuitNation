import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(private readonly http: HttpService) {}

  async forward(method: string, url: string, data?: any, headers?: any) {
    try {
      // Filter headers yang diperlukan
      const filteredHeaders: any = {
        'Content-Type': 'application/json',
      };
      
      if (headers) {
        // Copy important headers
        if (headers.authorization) {
          filteredHeaders.authorization = headers.authorization;
        }
        if (headers['content-type']) {
          filteredHeaders['content-type'] = headers['content-type'];
        }
      }

      this.logger.log(`Forwarding ${method} to ${url}`);
      if (data) {
        this.logger.debug(`Request body: ${JSON.stringify(data).substring(0, 200)}`);
      }

      const response = await firstValueFrom(
        this.http.request({
          method,
          url,
          data,
          headers: filteredHeaders,
          timeout: 30000, // 30 second timeout
          validateStatus: () => true, // Don't throw on any status
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Error forwarding to ${url}: ${error.message}`);
      
      if (error.response) {
        this.logger.error(`Response status: ${error.response.status}`);
        this.logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
        
        // Re-throw with proper error structure
        const err: any = new Error(error.message);
        err.response = error.response;
        throw err;
      }
      
      // For network errors or timeouts
      const err: any = new Error('Service temporarily unavailable');
      err.response = {
        status: 503,
        data: {
          message: 'Service temporarily unavailable',
          error: error.message
        }
      };
      throw err;
    }
  }
}