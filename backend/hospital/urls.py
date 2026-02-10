# myapp/urls.py

from django.urls import path
from . import views
from .views import StockSummaryView, StockWarehouseSummaryView, StockTotalSummaryView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/', views.NoteListCreateAPIView.as_view(), name='item-list'),
    path('notes/<int:pk>/', views.NoteDetailAPIView.as_view(), name='item-detail'),
    path('patientcard/', views.PatientCardListCreateAPIView.as_view(), name='patientcard-list'),
    path('patientcard/<int:pk>/', views.PatientCardDetailAPIView.as_view(), name='patientcard-detail'),
    path('patientnote/', views.PatientNoteListCreateAPIView.as_view(), name='patientnote-list'),
    path('patientnote/<int:pk>/', views.PatientNoteDetailAPIView.as_view(), name='patientnote-detail'),
    path('communicationcard/', views.CommunicationCardListCreateAPIView.as_view(), name='communicationcard-list'),
    path('communicationcard/<int:pk>/', views.CommunicationCardDetailAPIView.as_view(), name='communicationcard-detail'),
    path('populationcard/', views.PopulationCardListCreateAPIView.as_view(), name='populationcard-list'),
    path('populationcard/<int:pk>/', views.PopulationCardDetailAPIView.as_view(), name='populationcard-detail'),

    path('stock/', views.StockListCreateAPIView.as_view(), name='stock-list'),
    path('stock/<int:pk>/', views.StockDetailAPIView.as_view(), name='stock-detail'),
    path('order/', views.OrderListCreateAPIView.as_view(), name='order-list'),
    path('order/<int:pk>/', views.OrderDetailAPIView.as_view(), name='order-detail'),
    path('stock-summary/', StockSummaryView.as_view(), name='stock-summary'),
    path('stock-warehouse-summary/', StockWarehouseSummaryView.as_view(), name='stock-warehouse-summary'),

    path('stock-total-summary/', StockTotalSummaryView.as_view(), name='stock-total-summary'),

    path('worker/', views.WorkerListCreateAPIView.as_view(), name='worker-list'),
    path('worker/<int:pk>/', views.WorkerDetailAPIView.as_view(), name='worker-detail'),
    path('task-assignment/', views.TaskAssignmentListCreateAPIView.as_view(), name='task-assignment-list'),
    path('task-assignment/<int:pk>/', views.TaskAssignmentDetailAPIView.as_view(), name='task-assignment-detail'),
    path('task-check/', views.TaskCheckListCreateAPIView.as_view(), name='task-check-list'),
    path('task-check/<int:pk>/', views.TaskCheckDetailAPIView.as_view(), name='task-check-detail'),
   
    path('working-hours/', views.WorkingHoursListCreateAPIView.as_view(), name='working-hours-list'),
    path('working-hours/<int:pk>/', views.WorkingHoursDetailAPIView.as_view(), name='working-hours-detail'),
    path('leave/', views.LeaveListCreateAPIView.as_view(), name='leave-list'),
    path('leave/<int:pk>/', views.LeaveDetailAPIView.as_view(), name='leave-detail'),

    path('worker-file/', views.WorkerFileListCreateAPIView.as_view(), name='worker-file-list'),
    path('worker-file/<int:pk>/', views.WorkerFileDetailAPIView.as_view(), name='worker-file-detail'),


    path('patient-photo/', views.PatientPhotoListCreateAPIView.as_view(), name='patient-photo-list'),
    path('patient-photo/<int:pk>/', views.PatientPhotoDetailAPIView.as_view(), name='patient-photo-detail'),

    path('patient-files/', views.PatientFilesListCreateAPIView.as_view(), name='patient-files-list'),
    path('patient-files/<int:pk>/', views.PatientFilesDetailAPIView.as_view(), name='patient-files-detail'),

    path('used-stock/', views.UsedStocksListCreateAPIView.as_view(), name='used-stock-list'),
    path('used-stock/<int:pk>/', views.UsedStocksDetailAPIView.as_view(), name='used-stock-detail'),
    

    path('poll/', views.PollListCreateAPIView.as_view(), name='poll-list'),
    path('poll/<int:pk>/', views.PollDetailAPIView.as_view(), name='poll-detail'),
    path('warehouse/', views.WareHouseListCreateAPIView.as_view(), name='warehouse-list'),
    path('warehouse/<int:pk>/', views.WareHouseDetailAPIView.as_view(), name='warehouse-detail'),
    path('webhook/', views.webhook, name='webhook'),

]

