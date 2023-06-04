from django.urls import path

from base.views import get_routes, get_products, get_product

urlpatterns = [
    path('', get_routes, name='get_routes'),
    path('products/', get_products, name='get_products'),
    path('products/<str:pk>', get_product, name='get_products'),
]
