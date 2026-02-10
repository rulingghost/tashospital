import sys
import os
import traceback
from pathlib import Path

# Add the project directory to sys.path
# Vercel's current working directory is the root of the repository
# But just in case, we add the backend path explicitly relative to this file
# This file is in /api/index.py
# Root is one level up
PROJECT_ROOT = Path(__file__).resolve().parent.parent
backend_path = os.path.join(PROJECT_ROOT, 'backend')
sys.path.append(backend_path)

# Important: Set the settings module before anything else
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    # Initialize the Django WSGI application
    application = get_wsgi_application()
    
    # We use a wrapper to handle any runtime exceptions gracefully
    def handler(environ, start_response):
        try:
            return application(environ, start_response)
        except Exception:
            err = traceback.format_exc()
            start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
            return [f"RUNTIME ERROR:\n{err}".encode('utf-8')]

except Exception:
    err = traceback.format_exc()
    def handler(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f"BOOT ERROR:\n{err}".encode('utf-8')]

# Vercel entry point
app = handler
