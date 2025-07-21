#!/bin/bash
set -euo pipefail

TEMPLATE_PATH="server/sql/init.sql.template"
OUTPUT_PATH="server/sql/init.sql"
log() {
  echo -e "[$(date +'%H:%M:%S')] $1"
}

# Vérifie que le fichier template existe
if [[ ! -f "$TEMPLATE_PATH" ]]; then
  log "❌ Le fichier $TEMPLATE_PATH est introuvable."
  exit 1
fi

log "⚙️  Génération du fichier $OUTPUT_PATH à partir des variables d'environnement déjà chargées..."
envsubst < "$TEMPLATE_PATH" > "$OUTPUT_PATH"

log "✅ init.sql généré avec succès !"