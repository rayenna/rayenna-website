#!/bin/bash

# Auto-commit and push any changes made by Cursor to GitHub.
# Runs after the agent finishes each response.

cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || exit 0

# Do nothing if there are no changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo '{}' 
  exit 0
fi

# Commit with a timestamp so every push is identifiable
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
git add .
git commit -m "Cursor update — $TIMESTAMP" --quiet

# Push to GitHub
git push --quiet

echo '{}'
exit 0
