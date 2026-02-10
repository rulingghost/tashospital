from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # WebSocket bağlantısını kabul et
        self.group_name = "message_group"  # Webhook'taki grup adıyla aynı olmalı
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # WebSocket bağlantısını kapat
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Mesajı alıp WebSocket'e gönder
    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')
        print("Gelen mesaj:", message)  # Konsola mesajı yazdırın

        if message:
            await self.channel_layer.group_send(
                "message_group",
                {
                    "type": "send_message",
                    "message": message
                }
            )