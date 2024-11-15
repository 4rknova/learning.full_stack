# Stage 1: Build
FROM golang:1.23 AS build
ADD . /app
WORKDIR /app
RUN make build

# Stage 2: Image
FROM alpine:3.18
WORKDIR /app
COPY --from=build /app/server /app/
RUN mkdir -p /app/internal/pkg/db/migrations/mysql/
COPY --from=build /app/internal/pkg/db/migrations/mysql/ /app/internal/pkg/db/migrations/mysql/
ENTRYPOINT exec /app/server
