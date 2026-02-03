export interface ApiTestCase {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  body?: any;
  pathParams?: Record<string, string>;
  expectedStatus: number;
  category: 'functional' | 'negative';
}