from django.shortcuts import render

from . requests import get_all_patients
# Create your views here.


def all(request):
    all_patient_response = get_all_patients(request)


    context = {
        'patient_details': all_patient_response,

    }

    print(context['patient_details'])

    return render(request, 'HospitalManagement/index.html', context=context)