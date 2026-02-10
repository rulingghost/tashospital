# your_app_name/routing.py

from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/messages/', consumers.ChatConsumer.as_asgi()),
]
