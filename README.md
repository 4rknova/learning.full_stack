# Brief

Create a todo list management app. 

* Use react-native to create a mobile app.
* Use graphql to communicate with the back end. (Apollo gql client library)
* create a gql gateway service in go. (minikube)
* optional: setup kafka in minikube
* if kafka: produce messages for CRUD operations in a topic.
* create todo list service. (Minikube)
* if kafka: consume messages from topic. Act based on message type.
* if not kafka: use gRPC to communicate between gql gateway and todo service to perform CRUD operations.
* persistence: options:
    * in memory
    * postgres deployment(minikube)
    * sqlite

If too complex, remove k8s and run everything locally as a start

Other stuff to look into:

- grafana
- logging
- prometheus/thanos for metrics
- tempo for tracing

k8s concepts to look into:

* pods
* deployments
* statefulSets
* services
* ingress
* volumes
* volumeMounts
* secrets

Other:

* docker multi stage builds

