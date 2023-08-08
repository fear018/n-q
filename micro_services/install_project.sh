#!/bin/bash

cp .env.example .env && \
  npm install && \
  npm run docker:up && \
  npm run db:migrate && \
  npm run db:seed:up && \
  echo "Project installed successfully"

# ./install_project.sh