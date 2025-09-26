import { ServiceMessage, ServiceResponse } from './types';
export interface IServiceHandler<TRequest = any, TResponse = any> {
    handle(message: ServiceMessage<TRequest>): Promise<ServiceResponse<TResponse>>;
}
