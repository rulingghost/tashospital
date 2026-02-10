import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework import generics

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from hospital.serializers import  CustomTokenObtainPairSerializer, NoteSerializer, PatientCardSerializer, CommunicationCardSerializer, PatientFilesSerializer, PatientPhotoSerializer, PollSerializer, StockSerializer, TaskCheckSerializer, UsedStocksSerializer, WareHouseSerializer, WorkerFileSerializer, PatientNoteSerializer, WorkingHoursSerializer, LeaveSerializer, PopulationCardSerializer, OrderSerializer, WorkerSerializer, TaskAssignmentSerializer
from hospital.models import Note, PatientCard, CommunicationCard, PatientFiles, PatientPhoto, Poll, PopulationCard, Stock, Order, TaskCheck, UsedStocks, WareHouse, Worker, TaskAssignment, Leave, WorkerFile, WorkingHours, PatientNote
from django.contrib.auth.decorators import login_required, user_passes_test
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from django_filters import rest_framework as filters
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models import Sum
from django.db import models
from rest_framework.pagination import PageNumberPagination
import django_filters
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware.csrf import get_token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@csrf_exempt
def webhook(request):
    if request.method == 'POST':
        # Gelen JSON verisini al
        payload = json.loads(request.body)

        # Webhook verisini işleme
        event = payload.get('event')
        message_data = payload.get('data', {})
        message_content = message_data.get('message', {}).get('content')
        
        # WebSocket kanalına gönder
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "message_group",
            {
                "type": "send_message",
                "message": message_content,
            }
        )
        
        # Veritabanına kaydetme veya başka işlemler
        print(f"New message received: {message_content}")
        print(f"New payload received: {payload}")

        # İstediğiniz şekilde işlemi yaptıktan sonra başarılı yanıt döndürün
        return JsonResponse({'status': 'success', 'message': 'Webhook processed successfully'})
    
    # Eğer POST isteği değilse
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

#Filters
class StockFilter(filters.FilterSet):
    total_haved__lte = filters.NumberFilter(field_name='stock_haved', lookup_expr='lte')  # Küçük veya eşit
    default_filter = django_filters.CharFilter(method='filter_by_default')

    class Meta:
        model = Stock
        fields = '__all__'  # Tüm alanları filtrelemeye dahil eder
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
            models.TextField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
        }
    def filter_by_default(self, queryset, name, value):
        """
        Kullanıcının gönderdiği kelimeleri `first_name`, `last_name`, ve `national_id`
        alanlarında arar.
        """
        search_terms = value.split()
        query = Q()
        for term in search_terms:
            query |= Q(stock_name__icontains=term) | Q(stcok_group__icontains=term)
        return queryset.filter(query)
    
class PatientCardFilter(filters.FilterSet):
    default_filter = django_filters.CharFilter(method='filter_by_default')

    class Meta:
        model = PatientCard
        exclude = ['patient_image']
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
            models.TextField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
        }
    def filter_by_default(self, queryset, name, value):
        """
        Kullanıcının gönderdiği kelimeleri `first_name`, `last_name`, ve `national_id`
        alanlarında arar.
        """
        search_terms = value.split()
        query = Q()
        for term in search_terms:
            query |= Q(first_name__icontains=term) | Q(last_name__icontains=term) | Q(national_id__icontains=term) | Q(patient_number__icontains=term)
        return queryset.filter(query)
    
class OrderFilter(filters.FilterSet):
    default_filter = django_filters.CharFilter(method='filter_by_default')

    class Meta:
        model = Order
        fields = '__all__'  # Tüm alanları filtrelemeye dahil eder
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
            models.TextField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
        }
    def filter_by_default(self, queryset, name, value):
        """
        Kullanıcının gönderdiği kelimeleri `first_name`, `last_name`, ve `national_id`
        alanlarında arar.
        """
        search_terms = value.split()
        query = Q()
        for term in search_terms:
            query |= Q(order_name__icontains=term) | Q(order_group__icontains=term) | Q(order_pozition__icontains=term)
        return queryset.filter(query)
class WorkerFilter(filters.FilterSet):
    default_filter = django_filters.CharFilter(method='filter_by_default')

    class Meta:
        model = Worker
        exclude = ['worker_image']
        filter_overrides = {
            models.CharField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
            models.TextField: {
                'filter_class': filters.CharFilter,
                'extra': lambda f: {'lookup_expr': 'icontains'},
            },
        }
    def filter_by_default(self, queryset, name, value):
            """
            Kullanıcının gönderdiği kelimeleri `first_name`, `last_name`, ve `national_id`
            alanlarında arar.
            """
            search_terms = value.split()
            query = Q()
            for term in search_terms:
                query |= Q(first_name__icontains=term) | Q(last_name__icontains=term) | Q(department__icontains=term)
            return queryset.filter(query)
#Summaries
class StockSummaryView(APIView):
    def get(self, request):
        # Filtreyi uygula
        filterset = StockFilter(request.GET, queryset=Stock.objects.all())
        
        if not filterset.is_valid():
            return Response(filterset.errors, status=400)

        # Filtrelenmiş queryset'i al
        filtered_qs = filterset.qs

        # Ordering'i uygula
        ordering = request.GET.get('ordering')  # Örneğin, ?ordering=stock_name
        if ordering:
            # "-" işareti varsa ters sıralama yap
            filtered_qs = filtered_qs.order_by(ordering)

        # Filtrelenmiş verilerle gruplama ve hesaplama yap
        stock_data = (
            filtered_qs
            .values('stock_name', 'stock_skt', 'stcok_group')
            .annotate(total_buyed=Sum('stock_buyed'), total_haved=Sum('stock_haved'))
        )
        
        # Sayfalama işlemini yap
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Her sayfa için 10 kayıt döndür
        
        # Sayfalı veriyi oluştur
        paginated_data = paginator.paginate_queryset(stock_data, request)
        
        # Sayfalı ve filtrelenmiş veriyi döndür
        return paginator.get_paginated_response(paginated_data)

class StockWarehouseSummaryView(APIView):
    def get(self, request):
        # Filtreyi uygula
        filterset = StockFilter(request.GET, queryset=Stock.objects.all())
        
        if not filterset.is_valid():
            return Response(filterset.errors, status=400)

        # Filtrelenmiş queryset'i al
        filtered_qs = filterset.qs

        # Ordering'i uygula
        ordering = request.GET.get('ordering')  # Örneğin, ?ordering=stock_name
        if ordering:
            # "-" işareti varsa ters sıralama yap
            filtered_qs = filtered_qs.order_by(ordering)

        # Filtrelenmiş verilerle gruplama ve hesaplama yap
        stock_data = (
            filtered_qs
            .values('stock_name', 'stock_skt', 'stock_ut', 'stock_warehouse')
            .annotate(total_buyed=Sum('stock_buyed'), total_haved=Sum('stock_haved'))
        )
        
        # Sayfalama işlemini yap
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Her sayfa için 10 kayıt döndür
        
        # Sayfalı veriyi oluştur
        paginated_data = paginator.paginate_queryset(stock_data, request)
        
        # Sayfalı veriyi döndür
        return paginator.get_paginated_response(paginated_data)
    
class StockTotalSummaryView(APIView):
    def get(self, request):
        # Filtreyi uygula
        filterset = StockFilter(request.GET, queryset=Stock.objects.all())
        
        if not filterset.is_valid():
            return Response(filterset.errors, status=400)

        # Filtrelenmiş queryset'i al
        filtered_qs = filterset.qs

        # Ordering'i uygula
        ordering = request.GET.get('ordering')  # Örneğin, ?ordering=stock_name
        if ordering:
            # "-" işareti varsa ters sıralama yap
            filtered_qs = filtered_qs.order_by(ordering)

        # Filtrelenmiş verilerle gruplama ve hesaplama yap
        stock_data = (
            filtered_qs
            .values('stock_name')
            .annotate(total_buyed=Sum('stock_buyed'), total_haved=Sum('stock_haved'))
        )
        
        # Sayfalama işlemini yap
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Her sayfa için 10 kayıt döndür
        
        # Sayfalı veriyi oluştur
        paginated_data = paginator.paginate_queryset(stock_data, request)
        
        # Sayfalı veriyi döndür
        return paginator.get_paginated_response(paginated_data)
#Views

class NoteListCreateAPIView(generics.ListCreateAPIView):
    queryset= Note.objects.all()
    serializer_class=NoteSerializer

class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Note.objects.all()
    serializer_class=NoteSerializer

class PatientCardListCreateAPIView(generics.ListCreateAPIView):
    queryset= PatientCard.objects.all()
    serializer_class=PatientCardSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = PatientCardFilter
    ordering_fields = [field.name for field in PatientCard._meta.fields]  # Tüm alanlar

class PatientCardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PatientCard.objects.all()
    serializer_class=PatientCardSerializer

class CommunicationCardListCreateAPIView(generics.ListCreateAPIView):
    queryset= CommunicationCard.objects.all()
    serializer_class=CommunicationCardSerializer

class CommunicationCardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= CommunicationCard.objects.all()
    serializer_class=CommunicationCardSerializer

class PopulationCardListCreateAPIView(generics.ListCreateAPIView):
    queryset= PopulationCard.objects.all()
    serializer_class=PopulationCardSerializer

class PopulationCardDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PopulationCard.objects.all()
    serializer_class=PopulationCardSerializer

class StockListCreateAPIView(generics.ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = StockFilter
    ordering_fields = [field.name for field in Stock._meta.fields]  # Tüm alanlar

class StockDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Stock.objects.all()
    serializer_class=StockSerializer

class OrderListCreateAPIView(generics.ListCreateAPIView):
    queryset= Order.objects.all()
    serializer_class=OrderSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = OrderFilter
    ordering_fields = [field.name for field in Order._meta.fields]  # Tüm alanlar
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class OrderDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Order.objects.all()
    serializer_class=OrderSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]    

class WorkerListCreateAPIView(generics.ListCreateAPIView):
    queryset= Worker.objects.all()
    serializer_class=WorkerSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = WorkerFilter
    ordering_fields = [field.name for field in Worker._meta.fields]  # Tüm alanlar

class WorkerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Worker.objects.all()
    serializer_class=WorkerSerializer

class TaskAssignmentListCreateAPIView(generics.ListCreateAPIView):
    queryset= TaskAssignment.objects.all()
    serializer_class=TaskAssignmentSerializer

class TaskAssignmentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= TaskAssignment.objects.all()
    serializer_class=TaskAssignmentSerializer

class WorkingHoursListCreateAPIView(generics.ListCreateAPIView):
    queryset= WorkingHours.objects.all().order_by('-id')
    serializer_class=WorkingHoursSerializer

class WorkingHoursDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= WorkingHours.objects.all()
    serializer_class=WorkingHoursSerializer

class LeaveListCreateAPIView(generics.ListCreateAPIView):
    queryset = Leave.objects.all().order_by('-start_date')  # start_date azalan sırada
    serializer_class=LeaveSerializer

class LeaveDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Leave.objects.all()
    serializer_class=LeaveSerializer

class WorkerFileListCreateAPIView(generics.ListCreateAPIView):
    queryset= WorkerFile.objects.all()
    serializer_class=WorkerFileSerializer

class WorkerFileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= WorkerFile.objects.all()
    serializer_class=WorkerFileSerializer

class PatientNoteListCreateAPIView(generics.ListCreateAPIView):
    queryset= PatientNote.objects.all()
    serializer_class=PatientNoteSerializer

class PatientNoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PatientNote.objects.all()
    serializer_class=PatientNoteSerializer

class PatientPhotoListCreateAPIView(generics.ListCreateAPIView):
    queryset= PatientPhoto.objects.all()
    serializer_class=PatientPhotoSerializer

class PatientPhotoDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PatientPhoto.objects.all()
    serializer_class=PatientPhotoSerializer

class PatientFilesListCreateAPIView(generics.ListCreateAPIView):
    queryset= PatientFiles.objects.all()
    serializer_class=PatientFilesSerializer

class PatientFilesDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PatientFiles.objects.all()
    serializer_class=PatientFilesSerializer

class PollListCreateAPIView(generics.ListCreateAPIView):
    queryset= Poll.objects.all()
    serializer_class=PollSerializer

class PollDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Poll.objects.all()
    serializer_class=PollSerializer

class WareHouseListCreateAPIView(generics.ListCreateAPIView):
    queryset= WareHouse.objects.all()
    serializer_class=WareHouseSerializer

class WareHouseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= WareHouse.objects.all()
    serializer_class=WareHouseSerializer

class TaskCheckListCreateAPIView(generics.ListCreateAPIView):
    queryset= TaskCheck.objects.all().order_by('-date')
    serializer_class=TaskCheckSerializer

class TaskCheckDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= TaskCheck.objects.all()
    serializer_class=TaskCheckSerializer

class UsedStocksListCreateAPIView(generics.ListCreateAPIView):
    queryset= UsedStocks.objects.all().order_by('-used_at')
    serializer_class=UsedStocksSerializer

class UsedStocksDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= UsedStocks.objects.all()
    serializer_class=UsedStocksSerializer