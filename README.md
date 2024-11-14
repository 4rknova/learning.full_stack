<p align="center">
<img src="https://github.com/4rknova/learning.full_stack/blob/main/frontend/img/logo_dark.png?raw=true?raw=true#gh-dark-mode-only" alt="logo"/>
<img src="https://github.com/4rknova/learning.full_stack/blob/main/frontend/img/logo_light.png?raw=true#gh-light-mode-only" alt="logo"/>
</p>

# Brief

This project is a learning exercise at full stack development.
The goal is to create a simple to-do task management app. 

## Objectives

- [x] Use react-native to create a mobile app.
- [x]  Use graphql to communicate with the back end. (Apollo gql client library)
- [ ] create a gql gateway service in go. (minikube)
- [ ] optional: setup kafka in minikube
- [ ] if kafka: produce messages for CRUD operations in a topic.
- [ ] create todo list service. (Minikube)
- [ ] if kafka: consume messages from topic. Act based on message type.
- [ ] if not kafka: use gRPC to communicate between gql gateway and todo service to perform CRUD operations.
- [ ] persistence: options:
   - [ ] in memory
   - [ ] postgres deployment(minikube)
   - [ ] sqlite

If too complex, remove k8s and run everything locally as a start

## Miscellaneous

- [ ] docker multi stage builds
- [x] grafana
- [ ] logging
- [ ] prometheus/thanos for metrics
- [ ] tempo for tracing

## K8s concepts

- [ ] pods
- [ ] deployments
- [ ] statefulSets
- [ ] services
- [ ] ingress
- [ ] volumes
- [ ] volumeMounts
- [ ] secrets

# Captures
<p align="center">
<img src="https://github.com/4rknova/learning.full_stack/blob/main/demo.gif?raw=true" alt="demo"/>
</p>
