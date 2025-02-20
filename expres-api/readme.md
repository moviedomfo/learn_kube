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
  deployment.apps/rapi-api-dep  1/1
  ✅ Detalles:

    Nombre: rapi-api-dep
    Réplicas deseadas: 1 (solo hay una instancia corriendo).
    Réplicas actuales: 1 (el deployment ha creado el pod correctamente).
    Réplicas listas: 1 (el pod está corriendo sin problemas).

📌 Conclusión: Este deployment asegura que siempre haya al menos un pod ejecutando rapi-api.

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

## rapi-api-ingress.yaml

📌 Explicación del Ingress:

    Define el host rapi.local (podés modificarlo o agregarlo en /etc/hosts).
    Redirige /cliente1 al servicio rapi-api-cliente1-service.
    Redirige /cliente2 al servicio rapi-api-cliente2-service.

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
