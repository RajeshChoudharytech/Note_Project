from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note,VoiceRecording


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    
class VoiceRecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceRecording
        fields = ['id', 'audio_file', 'created_at']

class NoteSerializer(serializers.ModelSerializer):
    voice_recording = VoiceRecordingSerializer(read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'voice_recording','created_at', 'updated_at']

