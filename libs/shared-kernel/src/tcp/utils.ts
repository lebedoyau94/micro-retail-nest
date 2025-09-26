import { randomUUID } from 'crypto';
import { ServiceMessage, ServiceResponse } from './types';

/**
 * Crea un mensaje de servicio con correlationId único.
 */
export function createServiceMessage<T>(payload: T): ServiceMessage<T> {
  return {
    correlationId: randomUUID(),
    payload,
    timestamp: Date.now(),
  };
}

/**
 * Crea una respuesta de éxito estándar.
 */
export function createSuccessResponse<T>(
  correlationId: string,
  data: T,
): ServiceResponse<T> {
  return {
    correlationId,
    data,
    success: true,
  };
}

/**
 * Crea una respuesta de error estándar.
 */
export function createErrorResponse(
  correlationId: string,
  error: string,
): ServiceResponse<null> {
  return {
    correlationId,
    data: null,
    success: false,
    error,
  };
}
