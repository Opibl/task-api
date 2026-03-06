# Architecture

## 1. ¿Cómo escalaría esta API para soportar 1000 requests por segundo?

Para soportar una carga de alrededor de 1000 requests por segundo sería importante trabajar en varios niveles de la arquitectura.

Primero implementaría **escalado horizontal**. En lugar de ejecutar una sola instancia del servidor, desplegaría múltiples instancias de la aplicación detrás de un **load balancer** (por ejemplo Nginx o un balanceador de la nube como AWS ALB).

También optimizaría el acceso a la base de datos utilizando **connection pooling**, lo que permite reutilizar conexiones en lugar de abrir una nueva por cada request.

Otra mejora importante sería el uso de **caching**, por ejemplo con Redis. Muchas consultas de lectura pueden almacenarse temporalmente en cache para evitar consultas repetidas a la base de datos.

Finalmente monitorizaría el sistema usando herramientas de observabilidad como logs centralizados, métricas y tracing para identificar cuellos de botella.

---

## 2. ¿Qué cambios haría si el sistema creciera a millones de tareas?

Si el sistema creciera a millones de registros, la base de datos se volvería un punto crítico.

Primero agregaría **índices en la base de datos** en campos que se utilizan frecuentemente para consultas, como `status`, `priority` o `createdAt`.

También implementaría **paginación** en los endpoints que listan tareas para evitar devolver grandes volúmenes de datos en una sola respuesta.

Otra mejora sería separar operaciones de lectura y escritura utilizando **replicas de base de datos**, donde las lecturas se distribuyen entre varias instancias.

En casos de crecimiento mayor también podría evaluarse **sharding o particionamiento de tablas** para distribuir los datos entre múltiples nodos.

---

## 3. ¿Cómo implementaría autenticación JWT en este sistema?

La autenticación JWT se puede implementar en NestJS utilizando `Passport` y el módulo `@nestjs/jwt`.

El flujo general sería el siguiente:

1. El usuario envía sus credenciales al endpoint de login.
2. El servidor valida las credenciales.
3. Si son correctas, el servidor genera un **JWT** que contiene información del usuario.
4. El cliente envía ese token en el header `Authorization` en las siguientes peticiones.
5. Un **AuthGuard** verifica el token antes de permitir el acceso a los endpoints protegidos.

Este enfoque permite mantener el sistema **stateless**, ya que el servidor no necesita almacenar sesiones.

---

## 4. ¿Cómo manejaría procesamiento asincrónico para tareas pesadas?

Para tareas que requieren mucho procesamiento o que tardan demasiado tiempo en completarse, lo ideal es usar procesamiento asincrónico.

Una forma común es utilizar **colas de mensajes** como Redis + BullMQ, RabbitMQ o Kafka.

El flujo sería:

1. La API recibe la solicitud del usuario.
2. En lugar de procesar la tarea directamente, la envía a una **cola de trabajo**.
3. Un **worker** consume las tareas desde la cola y las procesa en segundo plano.
4. La API puede devolver inmediatamente una respuesta indicando que la tarea fue aceptada.

Este enfoque mejora el rendimiento de la API y evita bloquear el servidor con operaciones pesadas.