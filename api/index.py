import sys
import os
from pathlib import Path

# Add the project directory to sys.path
# Vercel's current working directory is the root of the repository
PROJECT_ROOT = Path(__file__).resolve().parent.parent
backend_path = os.path.join(PROJECT_ROOT, 'backend')
sys.path.append(backend_path)

# Important: Set the settings module before anything else
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    # Initialize the Django WSGI application
    application = get_wsgi_application()
    app = application
except Exception as e:
    # This will help us see the error in the logs or as a response
    print(f"FAILED TO LOAD DJANGO: {e}")
    
    # Catch-all handler for errors
    def app(environ, start_response):
        status = '500 Internal Server Error'
        headers = [('Content-type', 'text/plain; charset=utf-8')]
        start_response(status, headers)
        return [f"Internal Server Error: {str(e)}".encode('utf-8')]

handler = app
