from django.urls import path,include
from .views import SignupView,LoginView,UpdateProfileView
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/update-profile/', UpdateProfileView.as_view(), name='update-profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)