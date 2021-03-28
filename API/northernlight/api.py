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
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from northernlight.models import UserData, UserControl
from northernlight.seralizers import UserDataSerializer, UserControlSerializer


@api_view(['GET', 'POST'])
def status(request):
    if request.method == 'GET':
        data = UserData.objects.all().order_by('id').reverse()[:12]
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


@api_view(['GET', 'POST', 'PUT'])
def control(request, pk):

    try:
        data = UserControl.objects.get(pk=pk)
    except UserControl.DoesNotExist:
        if request.method == 'POST':
            data = JSONParser().parse(request)
            serializer = UserControlSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserControlSerializer(data)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        serializer = UserControlSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
