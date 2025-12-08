import {
  All,
  Controller,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxy: ProxyService) {}

  /**
   * Helper untuk build URL ke service
   */
  private buildServiceUrl(serviceBase: string, req: Request) {
    // req.url sudah tanpa prefix /api karena setGlobalPrefix
    // Contoh: req.url = '/auth/register' atau '/accounts'
    
    const url = serviceBase + '/api' + req.url;
    return url;
  }

  // ===== AUTH =====
  @All('auth*')
  async auth(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.AUTH_SERVICE_URL || 'http://auth-service:3006';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Auth proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }

  // ===== ACCOUNTS =====
  @All('accounts*')
  async accounts(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.ACCOUNT_SERVICE_URL || 'http://account-service:3001';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Accounts proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }

  // ===== TRANSACTIONS =====
  @All('transactions*')
  async transactions(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.TRANSACTION_SERVICE_URL || 'http://transaction-service:3002';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Transactions proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }

  // ===== BUDGETS =====
  @All('budgets*')
  async budgets(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.BUDGET_SERVICE_URL || 'http://budget-service:3003';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Budgets proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }

  // ===== GOALS =====
  @All('goals*')
  async goals(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.GOAL_SERVICE_URL || 'http://goal-service:3004';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Goals proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }

  // ===== ANALYTICS =====
  @All('analytics*')
  async analytics(@Req() req: Request, @Res() res: Response) {
    try {
      const base = process.env.ANALYTICS_SERVICE_URL || 'http://analytics-service:3005';
      const url = this.buildServiceUrl(base, req);
      
      console.log(`[Gateway] Proxying ${req.method} ${req.url} -> ${url}`);
      
      const data = await this.proxy.forward(
        req.method,
        url,
        req.body,
        req.headers
      );
      
      return res.json(data);
    } catch (error) {
      console.error('[Gateway] Analytics proxy error:', error.message);
      
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      }
      
      return res.status(500).json({
        message: 'Gateway error',
        error: error.message
      });
    }
  }
}