from django.urls import path

from base.views.user_views import register_user, get_users, get_user_profile

urlpatterns = [
    path('user/register/', register_user, name='user_register'),
    path('users/', get_users, name='get_users'),
    path('users/profile/', get_user_profile, name='get_user_profile'),

]
