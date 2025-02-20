## rapi-api-ingress.yaml

### Índice

1. [Aplicar el Ingress](#aplicar-el-ingress)
2. [Explicación del Ingress](#explicacion-del-ingress)
3. [Verificar el Ingress](#verificar-el-ingress)
4. [Revisar rutas del Ingress](#revisar-rutas-del-ingress)
5. [Revisar logs del Ingress](#revisar-logs-del-ingress)
6. [Verificar Ingress Controller](#verificar-ingress-controller)
7. [Revisar servicios del Ingress Controller](#revisar-servicios-del-ingress-controller)
8. [Solución si EXTERNAL-IP está vacío](#solucion-si-external-ip-esta-vacio)
9. [Prueba de conectividad interna](#prueba-de-conectividad-interna)
10. [Eliminar todos los artefactos](#eliminar-todos-los-artefactos)
11. [Resumen de comandos get](#resumen-de-comandos)

---

### 1. Aplicar el Ingress

```sh
kubectl apply -f rapi-api-ingress.yaml
```

### 2. Explicación del Ingress rapi-api-ingress.yaml

📌 **Explicación del Ingress:**

1️⃣ Define el host `rapi.local` (podés modificarlo o agregarlo en `/etc/hosts`).
2️⃣ Redirige `/cliente1` al servicio `rapi-api-cliente1-service`.
3️⃣ Redirige `/cliente2` al servicio `rapi-api-cliente2-service`.

📌 **Después de hacer estos pasos, probá nuevamente en el navegador o con curl:**

```sh
ping rapi.local

curl http://rapi.local/cliente1
curl http://rapi.local/cliente2
```

### 3. Verificar el Ingress

```sh
kubectl get ingress
```

📌 **Si `ADDRESS` está vacío, significa que el Ingress Controller no está corriendo.**

### 4. Revisar rutas del Ingress

```sh
  kubectl get pods -n kube-system | grep nginx
```

📌 **Debería salir algo como:**

    ingress-nginx-controller-xxxxx   1/1   Running   0     5m

📌 **Si no aparece nada, instalalo con:**

```sh
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

### 5. Revisar logs del Ingress

```sh
  kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

### 6. Verificar Ingress Controller

 **Revisar si el Ingress Controller está corriendo:**

```sh
kubectl get pods -n ingress-nginx
```

📌 **Si el controlador está bien, debería aparecer algo como:**

```sh
NAME                                       READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-4rrsd       0/1     Completed   0          11m
ingress-nginx-admission-patch-dt69b        0/1     Completed   1          11m
ingress-nginx-controller-cbb88bdbc-dvjdn   1/1     Running     0          11m
```

### 7. Revisar servicios del Ingress Controller

  ```sh
    kubectl get svc -n ingress-nginx
  ```

  Si todo está bien, deberías ver algo como:

    NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
    ingress-nginx-controller             LoadBalancer   10.109.170.98   localhost     80:32636/TCP,443:31978/TCP   12m
    ingress-nginx-controller-admission   ClusterIP      10.103.91.105   <none>        443/TCP                      12m

### 8. Solución si EXTERNAL-IP está vacío

🔧 **Solución si `EXTERNAL-IP` está vacío:**

📌 Si `EXTERNAL-IP` sigue vacío o `<pending>`, podemos usar un `port-forward` temporalmente para probar el acceso manualmente:

```sh
kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 8080:80
```

### 9. Prueba de conectividad interna

```sh
kubectl exec -it rapi-api-cliente1-dep-858498488d-2p28s -- curl -s http://rapi-api-cliente1-service/health
```

### 10. Eliminar todos los artefactos

🔴 **Eliminar todos los artefactos:**

```sh
kubectl delete ingress --all
kubectl delete svc --all
kubectl delete deployment --all
kubectl delete pods --all
kubectl delete rs --all
```

### 11. Resumen de comandos

| Comando                                      | Descripción                                         |
|----------------------------------------------|-----------------------------------------------------|
| `kubectl get ingress`                        | Muestra los Ingress creados.                        |
| `kubectl get pods -n kube-system \| grep nginx` | Verifica si el controlador de Ingress está corriendo. |
| `kubectl get pods -n ingress-nginx`          | Verifica si el Ingress Controller está funcionando. |
| `kubectl get svc -n ingress-nginx`           | Muestra los servicios del Ingress Controller.       |

7️⃣
8️⃣
