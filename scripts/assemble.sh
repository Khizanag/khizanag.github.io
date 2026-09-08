#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [ ! -d dist/presentations ]; then
    echo "dist/presentations is missing — run 'npm run build' first" >&2
    exit 1
fi

rm -rf _site
mkdir _site

rsync -a \
    --exclude='.git' \
    --exclude='.github' \
    --exclude='.gitignore' \
    --exclude='.editorconfig' \
    --exclude='.nvmrc' \
    --exclude='_site' \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='src' \
    --exclude='*.md' \
    --exclude='package.json' \
    --exclude='package-lock.json' \
    --exclude='tsconfig.json' \
    --exclude='vite.config.*' \
    --exclude='eslint.config.*' \
    --exclude='scripts' \
    --exclude='tests' \
    --exclude='playwright.config.*' \
    --exclude='test-results' \
    --exclude='playwright-report' \
    ./ _site/

# dist/ is excluded above, so the built app is copied in explicitly
cp -r dist/presentations _site/presentations

for required in _site/index.html _site/presentations/index.html _site/css/core/design-system.css _site/js/shared/keyboard-nav.js; do
    test -f "$required" || { echo "missing from _site: $required"; exit 1; }
done
for forbidden in _site/node_modules _site/src _site/scripts _site/tests; do
    test ! -e "$forbidden" || { echo "must not ship: $forbidden"; exit 1; }
done
leaked=$(find _site \( -name '*.test.*' -o -name '*.md' -o -name 'package*.json' \) -print)
if [ -n "$leaked" ]; then
    echo "must not ship:"
    echo "$leaked"
    exit 1
fi
find _site -maxdepth 1
