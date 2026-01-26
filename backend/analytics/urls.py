from django.urls import path
from .views import upload_csv, history, delete_dataset,generate_pdf

urlpatterns = [
    path('upload/', upload_csv),
    path('history/', history),
    path('delete/<int:dataset_id>/', delete_dataset),
    path("report/pdf/", generate_pdf),

]
