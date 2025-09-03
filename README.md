## Características principales

- Separación en capas (dominio, aplicación, infraestructura, presentación).

- Inyección de dependencias (DI) para desacoplar servicios y repositorios.

- Validación de datos con class-validator (unitId, status, timestamp).

- Manejo de errores y excepciones con HttpExceptionFilter.

- Idempotencia en creación de checkpoints mediante header Idempotency-Key.

- Soporte para repositorios intercambiables (ej. InMemory → PostgreSQL con TypeORM/Prisma).

- Listados seguros con manejo de errores claros (404 si no existen checkpoints).

## Endpoints

Crear checkpoint

```POST /checkpoints
Headers:
  Idempotency-Key: <uuid>
Body:
{
  "unitId": "c5b8a12d-1234-4f3c-9f7a-8a2f3e9b2d6f",
  "status": "IN_TRANSIT",
  "timestamp": "2025-09-02T12:30:00Z"
}
```

- Respuesta 201 Created con el checkpoint creado.

- Respuesta 409 Conflict si se reutiliza la misma Idempotency-Key

Obtener historial por unidad

```
GET /checkpoints/:unitId
```

- Respuesta 200 OK con la lista de checkpoints asociados.
- Respuesta 404 Not Found si no existen checkpoints para esa unidad.

## Requisitos

- Node.js v18+
- NestJS v10+
- Dependencias:
- @nestjs/common
- @nestjs/core
- class-validator
- class-transformer

### Instalación

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run start:dev
```

**Principios aplicados**

* SOLID: SRP (casos de uso aislados), DIP (interfaces en dominio, inyección de dependencias).

* Clean Architecture: dominio puro sin dependencias de framework, infraestructura reemplazable.

* Clean Code: nombres claros, validación estricta, DTOs bien definidos.

* Idempotencia y seguridad: evita duplicados y entradas inválidas.

**Próximos pasos**

* Integrar base de datos real (PostgreSQL/MySQL/MongoDB).

* Implementar transacciones con TypeORM/Prisma en persistencia.

* Añadir paginación y filtros en los listados.

* Autenticación y autorización con JWT/OAuth2.
