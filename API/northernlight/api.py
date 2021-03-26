# from .models import UserData
# from rest_framework import viewsets, permissions
# from northernlight.seralizers import UserDataSerializer
#
#
# class UserDataViewSet(viewsets.ModelViewSet):
#     queryset = UserData.objects.all()
#     serializer_class = UserDataSerializer
#     permission_classes = [permissions.AllowAny]

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from northernlight.models import UserData
from northernlight.seralizers import UserDataSerializer


@csrf_exempt
def user_data(request):
    if request.method == 'GET':
        data = UserData.objects.all()
        serializer = UserDataSerializer(data, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)

        # --------------- DO THINGS --------------- #

        serializer = UserDataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
