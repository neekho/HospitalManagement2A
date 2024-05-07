from django.http import HttpResponse
from django.shortcuts import render

from . requests import get_all_patients
# Create your views here.


def all(request):
    all_patient_response = get_all_patients(request)


    context = {
        'patient_detail': all_patient_response
    }

    return HttpResponse(context['patient_detail'])