#!/bin/bash

# Get all tasks
curl -X POST http://192.168.0.52:4000/api -H "Content-Type: application/json" -d '{"query": "query { tasks { id text isDone } }"}'

# Create new task
curl -X POST http://192.168.0.52:4000/api -H "Content-Type: application/json" -d '{"query": "mutation { createTask(input:{text:\"AUTO GENERATED TEST TASK\" userId:\"1\"}) { id }}"}'

# Delete a task
curl -X POST http://192.168.0.52:4000/api -H "Content-Type: application/json" -d '{"query": "mutation { deleteTask(input:\"1\") { isSuccessful }}"}'

# Update a task
curl -X POST http://192.168.0.52:4000/api -H "Content-Type: application/json" -d '{"query": "mutation { updateTask(input:{ id:\"2\" isDone:true }) { isSuccessful }}"}'
