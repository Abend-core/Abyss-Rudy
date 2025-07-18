#!/bin/bash
set -e

# Charger les secrets Doppler dans l'environnement
eval $(doppler run --no-command --quiet -- printenv | grep -E 'MYSQL_ROOT_PASSWORD|MYSQL_MASTER_PASSWORD|MYSQL_DATABASE' | sed 's/^/export /')

# Remplacer les variables dans le template
envsubst < init.sql.template > init.sql