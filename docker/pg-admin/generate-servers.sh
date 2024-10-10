#!/bin/bash

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Create JSON file
cat <<EOL > docker/pg-admin/servers.json
{
  "Servers": {
    "1": {
      "Group": "Servers",
      "Name": "Docker",
      "Host": "postgres",
      "Port": "5432",
      "MaintenanceDB": "$POSTGRES_DB",
      "Username": "$POSTGRES_USER",
      "Password": "$POSTGRES_PASSWORD",
      "SSLMode": "prefer",
      "Favorite": true
    }
  }
}
EOL

echo "servers.json has been created."