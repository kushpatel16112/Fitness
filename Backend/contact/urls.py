# urls.py

from django.urls import path
from .views import ContactTeamView

urlpatterns = [
    path('contact-team/', ContactTeamView.as_view(), name='contact_team'),
]
