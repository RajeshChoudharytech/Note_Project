from django.contrib.auth.models import User
from rest_framework import viewsets, permissions,status
from rest_framework.response import Response
from .serializers import UserSerializer,NoteSerializer,VoiceRecordingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note,VoiceRecording


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Grant permission based on the action.
        - Allow anyone to create a new user (register).
        - Require authentication for all other actions.
        """
        if self.action == 'create':  # Registration
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        # Restrict users to viewing/updating their own profile
        return User.objects.filter(id=self.request.user.id)
    
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class VoiceRecordingViewSet(viewsets.ModelViewSet):
    serializer_class = VoiceRecordingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VoiceRecording.objects.filter(note__user=self.request.user)

    def create(self, request, *args, **kwargs):
        note_id = request.data.get('note')
        try:
            note = Note.objects.get(id=note_id, user=request.user)
            if hasattr(note, 'voice_recording'):
                return Response({"error": "This note already has a recording."}, status=status.HTTP_400_BAD_REQUEST)
        except Note.DoesNotExist:
            return Response({"error": "Note not found or you do not have access to it."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(note=note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
