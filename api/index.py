import sys
import os
from pathlib import Path

# Proje kök dizinini ekle
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.append(os.path.join(PROJECT_ROOT, 'backend'))

# Settings modülünü ayarla
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

from django.core.wsgi import get_wsgi_application

# Vercel için uygulama nesnesini oluştur
try:
    application = get_wsgi_application()
    app = application
except Exception as e:
    # Hata durumunda boş bir uygulama döndür (Hata loglarını görebilmek için)
    def app(environ, start_response):
        start_response('500 Error', [('Content-Type', 'text/plain')])
        return [f"Django yuklenemedi: {str(e)}".encode('utf-8')]

handler = app
