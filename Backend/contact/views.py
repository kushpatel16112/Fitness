from django.core.mail import send_mail
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

@method_decorator(csrf_exempt, name='dispatch')
class ContactTeamView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone')
            state = data.get('state')
            city = data.get('city')
            message = data.get('message')

            # Construct the email message
            subject = "New Contact Form Submission"
            email_message = f"""
            You have a new contact form submission:

            Name: {name}
            Email: {email}
            Phone: {phone}
            State: {state}
            City: {city}
            Message: {message}
            """
            
            # Send the email
            send_mail(
                subject,
                email_message,
                email,
                ['dangerpython674@gmail.com'],
                fail_silently=False,
            )

            return JsonResponse({'message': 'Email sent successfully!'}, status=201)

        except Exception as e:
            print(f"Error sending email: {e}")
            return JsonResponse({'error': 'An error occurred while sending email.'}, status=500)
