from django.contrib import admin
from .models import get_in_touch

# Register your models here.

admin.register(get_in_touch)
class GetInTouchAdmin(admin.ModelAdmin):
    fields = ('name', 'email', 'message')
    list_display = ('name', 'email', 'message', 'created_at')
    list_filter = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')