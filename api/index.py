import sys
import os
from pathlib import Path

# Add the project directory to sys.path
# Vercel's current working directory is the root of the repository
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.append(os.path.join(PROJECT_ROOT, 'backend'))

# Important: Set the settings module before anything else
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    from django.core.wsgi import get_wsgi_application
    # Initialize the Django WSGI application
    application = get_wsgi_application()
    # Handle the request
    handler = application
except Exception as e:
    print(f"Error initializing Django application: {e}")
    raise e
