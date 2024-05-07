import requests as r


def get_all_patients(request):
    
    response = r.get('http://localhost:4000/api/v1/patients')

    print(response.status_code, response.url)

    return response.json()