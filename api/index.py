import sys
import os
import traceback
import json
from pathlib import Path

# Vercel Environment Debugging
# --------------------------
# Vercel runs in /var/task/ generally.
# Our file is at /var/task/api/index.py
# The code is at /var/task/backend/

try:
    current_file = Path(__file__).resolve()
    project_root = current_file.parent.parent  # /var/task/
    backend_dir = project_root / 'backend'     # /var/task/backend/

    # FORCE ADD TO PATH (Insert at beginning to prioritize)
    if str(backend_dir) not in sys.path:
        sys.path.insert(0, str(backend_dir))
    
    # Also add project root for good measure
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

    # Debug info for frontend if needed
    debug_paths = {
        "cwd": os.getcwd(),
        "file": str(current_file),
        "backend_dir": str(backend_dir),
        "sys_path": sys.path[:5],
        "backend_exists": backend_dir.exists(),
        "backend_contents": os.listdir(backend_dir) if backend_dir.exists() else []
    }

except Exception as e:
    debug_paths = {"error": str(e)}

# Django Configuration
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = None
boot_error = None

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    boot_error = traceback.format_exc()

def handler(environ, start_response):
    # Handle CORS preflight explicitly here just in case Django fails early
    if environ.get('REQUEST_METHOD') == 'OPTIONS':
        start_response('200 OK', [
            ('Access-Control-Allow-Origin', '*'),
            ('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'),
            ('Access-Control-Allow-Headers', 'Content-Type, Authorization'),
        ])
        return []

    # Health Check
    if environ.get('PATH_INFO', '').endswith('/health'):
        start_response('200 OK', [('Content-Type', 'application/json')])
        return [json.dumps({
            "status": "active" if application else "failed",
            "debug": debug_paths,
            "boot_error": boot_error
        }, default=str).encode('utf-8')]

    # ERROR: Boot Failure
    if boot_error:
        start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
        return [json.dumps({
            "error": "BOOT_FAILURE",
            "detail": boot_error,
            "debug": debug_paths
        }).encode('utf-8')]

    # Normal Django Handling
    if application:
        try:
            return application(environ, start_response)
        except Exception:
            err = traceback.format_exc()
            start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
            return [json.dumps({
                "error": "RUNTIME_FAILURE",
                "detail": err
            }).encode('utf-8')]
            
    # Unknown State
    start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
    return [json.dumps({"error": "UNKNOWN_STATE"}).encode('utf-8')]

app = handler
