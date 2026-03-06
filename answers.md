# Answers

## Parte 1 – Preguntas Teóricas

### 1. Diferencia entre Middleware, Guard, Interceptor y Pipe en NestJS

Middleware  
Los middleware se ejecutan antes de que la petición llegue al controlador. Se utilizan para tareas generales que deben ocurrir en muchas rutas, como logging, manejo de headers o autenticación básica. Funcionan a nivel de Express o Fastify y pueden aplicarse globalmente o a rutas específicas.

Guard  
Los guards se utilizan principalmente para autorización. Su función es decidir si una petición puede continuar o no. Por ejemplo, pueden verificar si el usuario está autenticado o si tiene permisos suficientes para acceder a un recurso.

Interceptor  
Los interceptors permiten ejecutar lógica antes y después de que el controlador procese la petición. Son útiles para transformar respuestas, agregar logging, medir tiempos de ejecución o implementar mecanismos de cache.

Pipe  
Los pipes se usan para validar o transformar los datos que llegan en una petición. En NestJS se utilizan mucho junto con DTOs y class-validator para asegurarse de que los datos enviados por el cliente tengan el formato correcto antes de llegar a la lógica de negocio.

---

### 2. ¿Cómo implementaría autorización basada en roles?

Una forma común de implementar autorización basada en roles en NestJS es utilizando Guards y decoradores personalizados.

Primero, el usuario se autentica mediante JWT. El token incluye información relevante del usuario, como su rol.

Luego se puede crear un decorador personalizado llamado `@Roles()` que permita definir qué roles tienen acceso a determinados endpoints. Después se implementa un `RolesGuard` que se encarga de leer el rol del usuario desde el request y compararlo con los roles requeridos por la ruta.

Si el usuario no tiene el rol necesario, el guard bloquea la petición. De esta manera la lógica de autorización queda separada del controlador y el código es más limpio y mantenible.

---

### 3. ¿Qué problemas aparecen cuando un backend crece mucho y cómo NestJS ayuda a resolverlos?

Cuando un backend empieza a crecer aparecen varios problemas.

Complejidad del código  
A medida que se agregan funcionalidades, el código puede volverse difícil de entender y mantener. NestJS ayuda a organizar el proyecto usando una arquitectura modular con Modules, Controllers y Services, lo que facilita separar responsabilidades.

Falta de organización  
En proyectos grandes es común que la lógica de negocio, las rutas y el acceso a datos se mezclen. NestJS promueve una estructura clara que ayuda a mantener el proyecto ordenado.

Escalabilidad  
Un backend que crece necesita escalar correctamente. NestJS facilita la adopción de arquitecturas de microservicios y permite integrarse fácilmente con herramientas como Redis, RabbitMQ o Kafka.

Testing  
A medida que el sistema crece también aumenta la necesidad de pruebas automatizadas. NestJS facilita la creación de unit tests y pruebas e2e gracias a su sistema de inyección de dependencias.

---

### 4. ¿Cómo manejaría configuración por ambiente (development, staging, production)?

La forma más común de manejar configuraciones por ambiente es utilizando variables de entorno.

En NestJS normalmente se usa `ConfigModule` para cargar variables desde archivos `.env`.

Cada ambiente puede tener su propio archivo de configuración, por ejemplo:

.env.development  
.env.staging  
.env.production  

Un ejemplo de variables de entorno podría ser:

DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=secret  
DB_NAME=tasksdb  

De esta forma el código no cambia entre ambientes. Solo cambian las variables de entorno dependiendo de dónde se despliegue la aplicación.

---

### 5. ¿Cómo evitaría que dos usuarios compren el último producto disponible al mismo tiempo?

Este problema se conoce como condición de carrera (race condition), donde dos procesos intentan modificar el mismo recurso al mismo tiempo.

Una forma común de evitarlo es utilizando transacciones en la base de datos. Durante la transacción se puede bloquear la fila del producto usando algo como `SELECT FOR UPDATE`, lo que evita que otro proceso modifique el mismo registro mientras se completa la operación.

Otra estrategia es el uso de optimistic locking, donde cada registro tiene un campo de versión o timestamp que permite detectar si el registro fue modificado por otro proceso.

En sistemas distribuidos también se pueden usar mecanismos de bloqueo distribuido utilizando herramientas como Redis.

Otra alternativa es procesar las compras mediante una cola de mensajes, lo que permite manejar las operaciones de manera secuencial y evitar conflictos entre múltiples solicitudes concurrentes.

---

## Parte 2 – Análisis y Debugging

### 1. Identifique al menos 5 problemas de arquitectura o diseño

El código presentado tiene varios problemas que serían importantes en un sistema real.

Uso de almacenamiento en memoria  
Las órdenes se guardan en un arreglo dentro del servicio (`private orders = []`). Esto significa que los datos se perderán si la aplicación se reinicia y además no permite escalar el sistema si hay múltiples instancias del servidor.

Falta de validación de datos  
El método `create(order)` recibe cualquier objeto sin validar su estructura. Esto puede provocar datos inconsistentes o errores más adelante.

Falta de manejo de errores  
En `updateStatus` se busca una orden por id, pero no se valida si realmente existe. Si `find()` devuelve `undefined`, el código intentará acceder a `order.status` y provocará un error.

Falta de tipado  
El código no define tipos para `order`, `id` o `status`. Esto reduce la seguridad del código y dificulta detectar errores durante el desarrollo.

No hay persistencia de datos  
En una aplicación real las órdenes deberían almacenarse en una base de datos y no en memoria.

Responsabilidades mezcladas  
Toda la lógica está concentrada en el servicio y no hay entidades, DTOs ni repositorios que separen claramente las responsabilidades.

---

### 2. ¿Cómo refactorizaría esta implementación en un proyecto real de NestJS?

En un proyecto real refactorizaría esta implementación siguiendo la arquitectura recomendada de NestJS.

Primero definiría una entidad `Order` que represente el modelo de datos en la base de datos.

Luego crearía DTOs para validar los datos de entrada, por ejemplo `CreateOrderDto` y `UpdateOrderStatusDto`, utilizando `class-validator`.

El `OrdersService` se encargaría de la lógica de negocio y utilizaría un repositorio (por ejemplo con TypeORM o Prisma) para interactuar con la base de datos.

También agregaría manejo adecuado de errores, por ejemplo lanzando `NotFoundException` cuando una orden no existe.

La estructura del módulo podría ser algo como:

OrdersModule  
- orders.controller.ts  
- orders.service.ts  
- dto/  
- entities/  

Además activaría validaciones con `ValidationPipe`, agregaría pruebas automatizadas y mantendría la lógica bien separada entre capas.

De esta manera el sistema sería más mantenible, escalable y consistente con las buenas prácticas de NestJS.