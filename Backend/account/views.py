from django.http import JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from .models import Account
import json

@method_decorator(csrf_exempt, name='dispatch')
class SignupView(View):
    def post(self, request): 
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            if not name or not email or not password:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            if Account.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists.'}, status=400)
            if Account.objects.filter(user_name=name).exists():
                return JsonResponse({'error': 'User name already exists.'}, status=400)

            account = Account.objects.create(
                user_name=name, 
                email=email, 
                password=password
            )
            return JsonResponse({'id': account.id, 'name': account.user_name, 'email': account.email}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'error': 'Internal Server Error'}, status=500)

    def options(self, request):  
        return JsonResponse({'status': 'ok'}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        try:
            data = json.loads(request.body) 
            name = data.get('name')
            password = data.get('password')

            account = Account.objects.filter(user_name=name).first()

            if not account:
                return JsonResponse({'error': 'Account not found.'}, status=400)
            
            if password == account.password:
                print("KUSH")
                response_data = {
                    'id': account.id,
                    'user_name': account.user_name,
                    'message': "Login successful"
                }
                return JsonResponse(response_data, status=201)
            else:
                return JsonResponse({'error': 'Invalid username or password.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
        
@method_decorator(csrf_exempt, name='dispatch')
class UpdateProfileView(View):
    def post(self, request):
        try:
            if request.content_type.startswith('multipart/form-data'):
                data = request.POST
                user_id = data.get('id')
                account = Account.objects.get(id=user_id)
                
                # Handle the profile picture
                profile_pic = request.FILES.get('profile_pic')


                account.user_name = data.get('user_name', account.user_name)
                account.weight = data.get('weight', account.weight)
                account.height = data.get('height', account.height)

                if profile_pic:
                    account.profile_pic = profile_pic

                
                account.save()

                return JsonResponse({
                    'id': account.id,
                    'user_name': account.user_name,
                    'weight': account.weight,
                    'height': account.height,
                    'profile_pic': account.profile_pic.url if account.profile_pic else None
                }, status=200)
            else:
                return JsonResponse({'error': 'Unsupported media type.'}, status=400)
        
        except Account.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
