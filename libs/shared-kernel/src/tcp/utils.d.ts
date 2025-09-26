import { ServiceMessage, ServiceResponse } from './types';
/**
 * Crea un mensaje de servicio con correlationId único.
 */
export declare function createServiceMessage<T>(payload: T): ServiceMessage<T>;
/**
 * Crea una respuesta de éxito estándar.
 */
export declare function createSuccessResponse<T>(correlationId: string, data: T): ServiceResponse<T>;
/**
 * Crea una respuesta de error estándar.
 */
export declare function createErrorResponse(correlationId: string, error: string): ServiceResponse<null>;
