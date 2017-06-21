from django.contrib import admin
from voucher_transaction.models import Voucher

admin.site.site_title = 'Binghamton University - SA Administration'
admin.site.site_header = 'Binghamton University - SA Administration'

#ugettext_lazy('My Admin')

#AdminSite.site_header = ugettext_lazy('My Administration')

#AdminSite.index_title = ugettext_lazy('DATA BASE ADMINISTRATION')
# Register your models here.''
admin.site.register(Voucher)
