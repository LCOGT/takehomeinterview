from django.urls import include, path
from django.contrib import admin

urlpatterns = [
    path('planets/', include('planets.urls')),
    path('admin/', admin.site.urls),
]

