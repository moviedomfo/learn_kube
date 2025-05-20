# Express rapi api

    API that allows consume Socios Updates by diferents endpoints .-

## Table of Contents

- [Run locally](#run-locally)
- [Enviropments](#env)

<a name="install"></a>

## build docker image

    docker build -t moviedomfo/rapi-api:1.0 .

## kubernetes

cd kube
kubectl apply -f .

## check

kubectl get all

1️⃣ - Pod :Es la instancia de tu aplicación corriendo dentro del clúster.

  pod/rapi-api-dep-7547d8bd-z55n4                  1/1     Running  

2️⃣ Service (NodePort) Es un servicio que expone el pod al exterior.
  service/rapi-api-service   NodePort    10.105.182.112   <none>        8080:31001/TCP

3️⃣ Deployment : gestiona la creación y escalabilidad de los pods.
    Recurso de Kubernetes de más alto nivel que se encarga de gestionar la creación y el ciclo de vida de los Pods.
    Permite características como:
  
      Escalado horizontal: Incrementar o reducir la cantidad de réplicas de Pods.
      Actualizaciones automatizadas: Actualizar Pods con nuevas versiones de la imagen de forma controlada (rolling updates).
      Alta disponibilidad: Kubernetes reemplaza automáticamente los Pods fallidos para garantizar que siempre haya suficientes réplicas ejecutándose.

    Ventajas del Deployment:
      Es resiliente: Los Pods fallidos son reemplazados automáticamente.
      Escalabilidad: Puedes ejecutar múltiples réplicas de tu aplicación fácilmente.
      Gestión de versiones: Facilita la implementación y actualización continua de tu aplicación.
      Idóneo para producción: Es ideal para entornos donde necesitas confiabilidad y alta disponibilidad.

  deployment.apps/rapi-api-dep  1/1
  ✅ Detalles:

    Nombre: rapi-api-dep
    Réplicas deseadas: 1 (solo hay una instancia corriendo).
    Réplicas actuales: 1 (el deployment ha creado el pod correctamente).
    Réplicas listas: 1 (el pod está corriendo sin problemas).

📌 Conclusión: Este deployment asegura que siempre haya al menos un pod ejecutando rapi-api.

Despliegue del Deployment:
      kubectl apply -f olecram-daemon-deployment.yaml
Verifica que el Deployment esté funcionando:

  kubectl get deployments
Comprueba el Pod asociado:

  kubectl get pods
  kubectl logs <nombre-del-pod>

4️⃣ ReplicaSet :Es el objeto que garantiza que el número correcto de pods esté corriendo.

    replicaset.apps/rapi-api-dep-7547d8bd                  1         1         1       32s

📌 Resumen gráfico de lo que está corriendo

        +------------------------------------------------------+
        |                      Deployment                     |
        |   (rapi-api-dep)                                    |
        |   - Gestiona los pods                               |
        |   - Controla la cantidad de réplicas               |
        +------------------------------------------------------+
                    |      
                    v
        +------------------------------------------------------+
        |                     ReplicaSet                       |
        |   (rapi-api-dep-7547d8bd)                           |
        |   - Asegura que el número de pods sea el correcto  |
        +------------------------------------------------------+
                    |      
                    v
        +------------------------------------------------------+
        |                        Pod                           |
        |   (rapi-api-dep-7547d8bd-z55n4)                     |
        |   - Ejecuta el contenedor de la API                 |
        +------------------------------------------------------+
                    |      
                    v
        +------------------------------------------------------+
        |                     Service                         |
        |   (rapi-api-service)                                |
        |   - Expone la API fuera del clúster                 |
        |   - Disponible en: NodePort 31001                   |
        +------------------------------------------------------+
4️⃣ DaemonSet
 Garantiza que se ejecute una copia de un Pod en cada nodo (o en algunos nodos seleccionados) del clúster.

 Ejemplos:

  🔍 log collector Recolectar logs de cada nodo (ej: fluentd, filebeat, logstash)
  📈 monitoring agent Monitorear CPU, memoria, red, etc. (ej: Prometheus Node Exporter)
  🔧 nodo configurador Aplicar configuraciones específicas por nodo
  🔒 agentes de seguridad Inspección de tráfico o control de acceso loc

Ejemplo típico cuando necesitás:

- montar un disco o volumen en cada nodo.
- que cada nodo tenga corriendo un agente de backup.
- inspeccionar tráfico de red local de cada nodo.
📌 ¿Entonces por qué casi nunca se define un ReplicaSet directamente? Porque los Deployments ya crean y gestionan un ReplicaSet por vos.

🛠 Si hacés
    kubectl get replicaset
   vas a ver algo como:
      NAME                     DESIRED   CURRENT   READY   AGE
      mi-api-rs-548dfcb7b8     2         2         2       5m

## rapi-api-ingress.yaml

📌 Explicación del Ingress: En /kube-ingress/readme.md

## Run locally

[1] Clone the repo locally
[2] run -> yarn install
[3] run dev command

    ```
        yarn dev
    ```

[4] Additionally if you have dockerhub installed. We leave you a dockerfil ready!!
pleasse ref to [Dockerize](#dockerize)

## models generation

We have used sequalize-auto to generate all models from dexisting database

1. first of all you must install :

```
  yarn add sequelize-auto
```

2. To generate database run the following cmd

Opt params
-v, --views Include database views in generated models [boolean]
--useDefine Use `sequelize.define` instead of `init` for es6|esm|ts

```
    yarn sequelize-auto -h 100.1.1.1 -d [database] -u [username] -x [pwd] -p 7780  --dialect mssql  -o ./src/infra/db/seq-models -l ts -views
```
