from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet,UserViewSet,VoiceRecordingViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('notes', NoteViewSet, basename='note')
router.register('voice_recording', VoiceRecordingViewSet, basename='voice_recording')

urlpatterns = [
    path('', include(router.urls)),
]