Cómo aplicar los archivos por separado

    kubectl apply -f persistent-volume.yaml
    kubectl apply -f persistent-volume-claim.yaml
    kubectl apply -f deployment.yaml

En un solo paso
    kubectl apply -f .