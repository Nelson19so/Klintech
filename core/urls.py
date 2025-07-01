from django.contrib import admin
from django.urls import path

from .views import main_app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_app, name='app')
]
