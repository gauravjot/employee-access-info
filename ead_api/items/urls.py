from django.urls import path
from .views import addItemType, getAllItemTypes, getItemType, addItemTypeField

urlpatterns = [
    path('api/item/type/add/', addItemType),
    path('api/item/type/all/', getAllItemTypes),
    path('api/item/type/<id>/', getItemType),
    path('api/item/type/<id>/add/', addItemTypeField),
    #    path('api/user/verifyemail/<emailtoken>/', verifyEmail),
]
