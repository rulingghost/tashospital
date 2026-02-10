import sys
import os
from pathlib import Path

# Proje kök dizinini ekle
PROJECT_ROOT = Path(__file__).resolve().parent
backend_path = os.path.join(PROJECT_ROOT, 'backend')
sys.path.append(backend_path)

# Settings modülünü ayarla
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application

# Vercel için uygulama nesnesini oluştur
try:
    application = get_wsgi_application()
    app = application
except Exception as e:
    def app(environ, start_response):
        start_response('500 Error', [('Content-Type', 'text/plain')])
        return [f"Django yuklenemedi: {str(e)}".encode('utf-8')]

handler = app
