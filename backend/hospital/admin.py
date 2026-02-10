from django.contrib import admin
from hospital.models import  Note, Order, PatientCard, CommunicationCard, PopulationCard, Stock, WareHouse, Worker, TaskAssignment, Leave, PatientNote, Poll, PatientPhoto
# Register your models here.
admin.site.register(PatientCard)
admin.site.register(PatientNote)
admin.site.register(Stock)
admin.site.register(WareHouse)
admin.site.register(Order)
admin.site.register(Worker)
admin.site.register(TaskAssignment)
admin.site.register(Leave)
admin.site.register(Poll)
admin.site.register(PatientPhoto)

