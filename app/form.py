from django import forms
from .models import get_in_touch

class get_in_touch_form(forms.ModelForm):

  class Meta:
    model = get_in_touch
    fields = ('name', 'email', 'message')