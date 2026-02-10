import os
import sys

# Vercel entry point
# Add 'backend' directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import django
django.setup()

# Otomatik Kullanıcı Oluşturma
from django.contrib.auth.models import User
try:
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Vercel: Superuser 'admin' created.")
except Exception as e:
    print(f"Vercel: User check failed: {e}")

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()
