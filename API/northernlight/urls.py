# from rest_framework import routers
# from .api import UserDataViewSet

# router = routers.DefaultRouter()
# router.register('api/northernlight', UserDataViewSet, 'UserData')
#
# urlpatterns = router.urls

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from northernlight import api

urlpatterns = [
    path('api/status/', api.status),
    path('api/control/<int:pk>/', api.control)
]

urlpatterns = format_suffix_patterns(urlpatterns)
