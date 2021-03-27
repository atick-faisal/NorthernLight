from rest_framework import serializers
from northernlight.models import UserData, UserControl


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = '__all__'


class UserControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserControl
        fields = '__all__'
