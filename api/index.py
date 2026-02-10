import sys
import os
import traceback
import json
from pathlib import Path

# --- Path Configuration ---
# Vercel places the function in /var/task/api/index.py (usually)
# We want to add /var/task/backend to sys.path
try:
    # Go up two levels from api/index.py to get to the project root
    PROJECT_ROOT = Path(__file__).resolve().parent.parent
    backend_path = os.path.join(PROJECT_ROOT, 'backend')
    
    # Ensure backend path is in sys.path
    if backend_path not in sys.path:
        sys.path.insert(0, backend_path)
except Exception as e:
    print(f"Path config error: {e}")

# --- Django Configuration ---
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Lazy load application to capture boot errors
application = None
boot_error = None

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    boot_error = traceback.format_exc()

# --- Vercel Request Handler ---
def handler(environ, start_response):
    # 1. Health Check Route (Bypasses Django to test Vercel runtime)
    path = environ.get('PATH_INFO', '')
    if path.endswith('/health'):
        start_response('200 OK', [('Content-Type', 'application/json')])
        data = {
            "status": "active", 
            "backend_path": backend_path,
            "sys_path": sys.path,
            "boot_error": boot_error
        }
        return [json.dumps(data, default=str).encode('utf-8')]

    # 2. Handle Boot Errors (If Django failed to start)
    if boot_error:
        start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
        error_response = {
            "error": "Django Boot Error",
            "detail": boot_error,
            "files_at_backend": os.listdir(backend_path) if os.path.exists(backend_path) else "backend dir not found"
        }
        return [json.dumps(error_response).encode('utf-8')]

    # 3. Handle Django Requests
    if application:
        try:
            return application(environ, start_response)
        except Exception:
            err = traceback.format_exc()
            start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
            return [json.dumps({"error": "Runtime Error", "detail": err}).encode('utf-8')]
    
    # Fallback
    start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
    return [json.dumps({"error": "Unknown State"}).encode('utf-8')]

# Vercel entry point
app = handler
