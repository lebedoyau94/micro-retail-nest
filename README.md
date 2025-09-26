# Micro Retail Nest

## Arquitectura
Este proyecto está basado en microservicios con NestJS.  
Cada servicio cumple un rol específico y se comunica por **TCP** a través del Gateway.

### Servicios principales
- **Auth Service**: autenticación y emisión de tokens.
- **Billing Service**: facturación y devoluciones.
- **Customers Service**: gestión de clientes.
- **Inventory Service**: gestión de productos e inventario.
- **Suppliers Service**: gestión de proveedores.
- **Gateway**: punto de entrada HTTP → enruta a microservicios vía TCP.

### Librerías compartidas
- **shared-auth**: guardas, estrategias y decoradores de autenticación.
- **shared-db**: conexión y entidades de base de datos.
- **shared-kernel**: contratos TCP y constantes.

---

## Endpoints principales (Gateway)

### Auth
- `POST /auth/login` → Login con credenciales.

### Customers
- `POST /customers` → Crear cliente.
- `GET /customers/:id` → Obtener cliente.

### Inventory
- `POST /inventory` → Crear producto.
- `GET /inventory/:id` → Obtener producto.

### Billing
- `POST /billing` → Crear factura con productos.
- `POST /billing/refund` → Devolución de factura.

---

## Contratos TCP (Shared Kernel)

## Cómo ejecutar
Local con Docker

### Levantar contenedores:

docker compose up --build


Acceder al Gateway:
http://localhost:3000

### Sin Docker
pnpm install
pnpm -r build
pnpm -r start:dev