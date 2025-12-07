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
     * Helper untuk build URL ke service:
     * - gateway route:   /api/<segment>...
     * - service target:  SERVICE_URL + /api/<segment>...
     *
     * req.url di sini sudah TANPA prefix /api (karena setGlobalPrefix),
     * jadi misalnya:
     *   - request:   GET /api/budgets?userId=1
     *   - req.url:   /budgets?userId=1
     *   - servicePathPrefix: '/api/budgets'
     *   → target: SERVICE_URL + '/api/budgets?userId=1'
     */
    private buildServiceUrl(serviceBase: string, req: Request, servicePathPrefix: string) {
      // Pisah path & query string
      const [path, query] = req.url.split('?'); // contoh path: '/budgets' atau '/analytics/summary'
      // Ganti segment pertama dengan prefix '/api/...'
      const newPath = path.replace(/^\/[^/]+/, servicePathPrefix);
      let url = serviceBase + newPath;
      if (query) {
        url += `?${query}`;
      }
      return url;
    }
  
    // ===== ACCOUNTS =====
    @All('accounts*')
    async accounts(@Req() req: Request, @Res() res: Response) {
      const base = process.env.ACCOUNT_SERVICE_URL || 'http://account-service:3001';
      const url = this.buildServiceUrl(base, req, '/api/accounts');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  
    // ===== TRANSACTIONS =====
    @All('transactions*')
    async transactions(@Req() req: Request, @Res() res: Response) {
      const base = process.env.TRANSACTION_SERVICE_URL || 'http://transaction-service:3002';
      const url = this.buildServiceUrl(base, req, '/api/transactions');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  
    // ===== BUDGETS =====
    @All('budgets*')
    async budgets(@Req() req: Request, @Res() res: Response) {
      const base = process.env.BUDGET_SERVICE_URL || 'http://budget-service:3003';
      const url = this.buildServiceUrl(base, req, '/api/budgets');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  
    // ===== GOALS =====
    @All('goals*')
    async goals(@Req() req: Request, @Res() res: Response) {
      const base = process.env.GOAL_SERVICE_URL || 'http://goal-service:3004';
      const url = this.buildServiceUrl(base, req, '/api/goals');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  
    // ===== ANALYTICS (punya banyak sub path: /cashflow, /summary, dll) =====
    @All('analytics*')
    async analytics(@Req() req: Request, @Res() res: Response) {
      const base = process.env.ANALYTICS_SERVICE_URL || 'http://analytics-service:3005';
      const url = this.buildServiceUrl(base, req, '/api/analytics');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  
    // (opsional) ===== AUTH =====
    @All('auth*')
    async auth(@Req() req: Request, @Res() res: Response) {
      const base = process.env.AUTH_SERVICE_URL || 'http://auth-service:3006';
      const url = this.buildServiceUrl(base, req, '/api/auth');
      const data = await this.proxy.forward(req.method, url, req.body);
      return res.json(data);
    }
  }
  