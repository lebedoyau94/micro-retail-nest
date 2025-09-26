import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { roundRobin } from '../utils/round-robin';

type Endpoint = { host: string; port: number };

function parseEndpoints(envVar?: string, defPort?: number): Endpoint[] {
  if (!envVar) return [];
  return envVar
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [host, portStr] = s.split(':');
      return { host, port: Number(portStr ?? defPort) };
    });
}

const endpoints = {
  auth: parseEndpoints(process.env.TCP_AUTH_ENDPOINTS, 4001) || [{ host: 'localhost', port: 4001 }],
  inventory: parseEndpoints(process.env.TCP_INVENTORY_ENDPOINTS, 4002) || [{ host: 'localhost', port: 4002 }],
  suppliers: parseEndpoints(process.env.TCP_SUPPLIERS_ENDPOINTS, 4003) || [{ host: 'localhost', port: 4003 }],
  customers: parseEndpoints(process.env.TCP_CUSTOMERS_ENDPOINTS, 4004) || [{ host: 'localhost', port: 4004 }],
  billing: parseEndpoints(process.env.TCP_BILLING_ENDPOINTS, 4005) || [{ host: 'localhost', port: 4005 }],
};

export function getClient(service: keyof typeof endpoints): ClientProxy {
  const instance = roundRobin(endpoints[service]);
  return ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host: instance.host, port: instance.port },
  });
}
