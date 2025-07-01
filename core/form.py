from django import forms
from .models import get_in_touch

class get_in_touch_form(forms.ModelForm):

  class Meta:
    model = get_in_touch
    fields = ('name', 'email', 'message')

  def clean(self):
    cleaned_data = super().clean()
    name = cleaned_data.get('name')
    email = cleaned_data.get('email')
    message = cleaned_data.get('message')

    if not name or email or message:
      raise forms.ValidationError('All fields are required')
    
    if len(name) or len(email) or len(message) <= 5:
      raise forms.ValidationError(
        'Invalid input. All input should be at least min of 5 letters length'
      )
    
    return cleaned_data