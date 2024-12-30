from django.contrib.auth.models import User
from django.db import models

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class VoiceRecording(models.Model):
    note = models.OneToOneField(Note, on_delete=models.CASCADE, related_name='voice_recording')
    audio_file = models.FileField(upload_to='voice_recordings/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Recording for: {self.note.title}"