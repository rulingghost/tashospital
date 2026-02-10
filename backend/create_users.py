import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

# Create superuser
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print("Superuser 'admin' created with password 'admin123'")
else:
    print("Superuser 'admin' already exists")

# Create a regular user
if not User.objects.filter(username='user').exists():
    User.objects.create_user('user', 'user@example.com', 'user123')
    print("Regular user 'user' created with password 'user123'")
else:
    print("Regular user 'user' already exists")
