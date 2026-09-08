import { useCallback, useEffect, useState } from 'react';
import { healthService } from '@/services/healthService';

export type HealthIndicator = 'unknown' | 'ok' | 'degraded';

export function useHealthStatus(): HealthIndicator {
  const [status, setStatus] = useState<HealthIndicator>('unknown');

  const refresh = useCallback(async (): Promise<void> => {
    try {
      const data = await healthService.getStatus();
      setStatus(data.status === 'ok' && data.database.status === 'up' ? 'ok' : 'degraded');
    } catch {
      setStatus('degraded');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return status;
}
