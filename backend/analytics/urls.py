from django.urls import path
from .views import upload_csv, history,delete_dataset

urlpatterns = [
    path('upload/', upload_csv),
    path('history/', history),
    path('delete/<int:dataset_id>/', delete_dataset),
]
