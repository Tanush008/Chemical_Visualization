from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Dataset
from .utils import analyze_csv
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from .models import Dataset


@api_view(['POST'])
def upload_csv(request):
    file = request.FILES['file']
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

# checking the database name
    if Dataset.objects.filter(name=file.name).exists():
        return Response(
            {"message": "Dataset with this name already exists"},
            status=409
        )
    summary = analyze_csv(file)

    Dataset.objects.create(
        name=file.name,
        summary=summary
    )

    # keep only last 5
    if Dataset.objects.count() > 5:
        Dataset.objects.first().delete()

    return Response(summary)


@api_view(['GET'])
def history(request):
    datasets = Dataset.objects.order_by('-uploaded_at')[:5]
    data = []
    for d in datasets:
        data.append({
            "id": d.id,
            "name": d.name,
            "summary": d.summary,
            "uploaded_at": d.uploaded_at
        })
    return Response(data)


@api_view(['DELETE'])
def delete_dataset(request, dataset_id):
    try:
        dataset = Dataset.objects.get(id=dataset_id)
        dataset.delete()
        return Response({"message": "Dataset deleted successfully"})
    except Dataset.DoesNotExist:
        return Response({"error": "Dataset not found"}, status=404)


@api_view(['GET'])
def generate_pdf(request):
    dataset = Dataset.objects.last()

    if not dataset:
        return Response({"error": "No data available"}, status=404)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    c = canvas.Canvas(response, pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, "Chemical Equipment Report")

    c.setFont("Helvetica", 12)
    y = height - 100

    for key, value in dataset.summary.items():
        c.drawString(50, y, f"{key}: {value}")
        y -= 20

    c.showPage()
    c.save()

    return response
