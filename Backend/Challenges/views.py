from django.http import JsonResponse
from .models import Challenge

def challenge_list(request):
    challenges = Challenge.objects.all()
    challenge_data = [
        {
            'title': challenge.title,
            'description': challenge.description,
            'goal': challenge.goal,
            'tracking_method': challenge.tracking_method,
            'reward': challenge.reward,
            'start_date': challenge.start_date,
            'end_date': challenge.end_date,
            'challenge_type': challenge.challenge_type,
            'image_url': challenge.challenge_img.url if challenge.challenge_img else None,  # Get the image URL
        }
        for challenge in challenges
    ]
    return JsonResponse({'challenges': challenge_data})