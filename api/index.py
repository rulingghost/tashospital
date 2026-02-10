import sys
import os

# Add the root directory to the sys.path
# Vercel's structure: /var/task/
# Our structure:
# /api/index.py
# /backend/backend/settings.py
# /backend/db.sqlite3

base_dir = os.path.dirname(os.path.dirname(__file__))
sys.path.append(os.path.join(base_dir, 'backend'))

from backend.wsgi import app

# Vercel needs 'app' to be the entry point
handler = app
