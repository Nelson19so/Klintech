from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from .models import get_in_touch
from .form import get_in_touch_form

# Create your views here.

# view controller here
def main_app(request):

  if request.method == "POST":
    form = get_in_touch_form(request.POST)
    print(request.POST)

    if form.is_valid():
      new_form = get_in_touch(
        name = form.cleaned_data["name"],
        email = form.cleaned_data["email"],
        message = form.cleaned_data["message"]
      )

      new_form.save()

      try:

        send_mail(
          subject=f"THANK YOU FOR REACHING OUT TO US: '{new_form.name.upper()}', i'm excited to discuss your project further and explore howi can assist you.",
          message=f"Hi {new_form.name},\nWe have received your message:\n\n{new_form.message}\n\We'll get back to you soon!\n\mBest regards Klintech",
          from_email=settings.EMAIL_HOST_USER,
          recipient_list=[new_form.email],
          fail_silently=False,
        )

        send_mail(
          subject=f"You have a New contact form submission from '{new_form.name}'",
          message=f"Name: {new_form.name}\nEmail: {new_form.email}\nSubject: {new_form.message}",
          from_email=settings.EMAIL_HOST_USER,
          recipient_list=['klintech02@gmail.com'],
          fail_silently=False,
        )
    
      except Exception as e:
        return HttpResponse(f"Error {str(e)}")

      print("posted form successfully")
    
    else:
      print("something went wrong")

  else:
    form = get_in_touch_form()

  return render(request, 'core/index.html')
