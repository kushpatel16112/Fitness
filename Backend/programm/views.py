from django.http import JsonResponse
from django.views import View
from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import Programm,Enrollment
from account.models import Account
import json

@method_decorator(csrf_exempt, name='dispatch')
class Programs(View):
    def post(self,request):
        try:
            programs = Programm.objects.all().values()
            if programs:
                return JsonResponse(list(programs), safe=False, status=201)
            else:
                return JsonResponse({'error': 'Programs not found due to some error'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON.'}, status=400)
        except Exception as e:
            print("Error:", str(e))
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
        

@csrf_exempt
def enroll_program(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            program_id = data.get("program_id")
            user_id = data.get("user_id")

            user = Account.objects.get(id=user_id)
            program = Programm.objects.get(id=program_id)

            if Enrollment.objects.filter(user=user, program=program).exists():
                return JsonResponse({"error": "You are already enrolled in this program."}, status=400)
            
            enrollment = Enrollment.objects.create(user=user, program=program)
            return JsonResponse({"message": "Enrolled successfully!"}, status=200)

        except Programm.DoesNotExist:
            return JsonResponse({"error": "Program not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=400)

@csrf_exempt
def get_enrolled_programs(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get("user_id")
        user = Account.objects.get(id=user_id)
        enrollments = Enrollment.objects.filter(user=user)
        enrolled_programs = [
            {
                "id": enrollment.program.id,
                "programm_name": enrollment.program.programm_name,
                "description": enrollment.program.description,
                "programm_img": enrollment.program.programm_img.url,
            }
            for enrollment in enrollments
        ]
        
        print(enrolled_programs)
        return JsonResponse(enrolled_programs, safe=False)
    return JsonResponse({"error": "Invalid request method."}, status=400)
