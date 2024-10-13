from .views import Programs,enroll_program,get_enrolled_programs
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('programs/', Programs.as_view(), name="programs"),
    path("enroll/", enroll_program, name="enroll_program"),
    path("api/enrolled-programs/", get_enrolled_programs, name="enrolled_programs"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)