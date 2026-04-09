#!/usr/bin/env bash
# Deploy the games-portal worker to mccarrison.me/games (production).
#
# Safety: only deploys from main branch.

set -euo pipefail

cd "$(dirname "$0")"

branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch" != "main" ]; then
  echo "ERROR: refusing to deploy prod from branch '$branch'."
  echo "Switch to main first."
  exit 1
fi

echo "Deploying games-portal from main..."
cd worker
npx wrangler deploy
echo
echo "Done. Live at https://mccarrison.me/games/"
