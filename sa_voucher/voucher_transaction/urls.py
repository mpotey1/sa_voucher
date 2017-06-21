from django.conf.urls import url
from voucher_transaction import views

#app_name = 'first_app'

urlpatterns=[
    #url(r'forms/$',views.form_enter,name='forms_enter'),
    url(r'^$',views.index,name='index'),
    url(r'steps/$',views.steps,name='steps'),
    url(r'form/$',views.form,name='form'),
]
