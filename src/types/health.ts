export interface FullHealthStatus {
  status: 'ok' | 'degraded';
  server: {
    status: 'up';
    uptime: number;
    timestamp: string;
  };
  database: {
    status: 'up' | 'down';
  };
}
