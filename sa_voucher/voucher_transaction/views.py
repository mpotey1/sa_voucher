from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from voucher_transaction.models import Voucher
import uuid

# Create your views here.
def index(request):
    return render(request,'index.html')

def steps(request):
    return render(request,'op.html')

def form(request):
    savr=Voucher()
    m={}
    if request.method == "POST":
        savr.your_organization=request.POST['selectorganization']
        m['organization']=request.POST['selectorganization']
        savr.pay_to=request.POST['payto']
        m['payto']=request.POST['payto']
        savr.address_line=request.POST['addressline']
        m['address']=request.POST['addressline']
        savr.city_state_zip=request.POST['citystatezip']
        m['citystatezip']=request.POST['citystatezip']
        savr.phone_number=request.POST['phonenumber']
        m['phonenumber']=request.POST['phonenumber']
        savr.email_id=request.POST['emailid']
        savr.delivery_type=request.POST['selectdeliverytype']
        m['deliverytype']=request.POST['selectdeliverytype']
        if (savr.delivery_type=='Vendor Payment' or savr.delivery_type=='Reimbursement'):
            savr.payment_options=request.POST['selectpayment']
            if (savr.payment_options=='Pick Up By'):
                savr.pick_up_by=request.POST['pickupby']
                m['paymentoption']='Pick Up By - '
                m['paymentargument']=request.POST['pickupby']
            elif (savr.payment_options=='Mail To Payee'):
                m['paymentoption']='Mail To Payee'
                m['paymentargument']=''
        elif (savr.delivery_type=='Transfer'):
            savr.transfer_payment=request.POST['selecttransferpayment']
            m['paymentoption']=request.POST['selecttransferpayment']
            m['paymentargument']=''

        savr.personal_service=request.POST['selectpersonalservice']
        m['personalservice']=request.POST['selectpersonalservice']
        if (savr.personal_service=='Yes'):
            savr.personal_service_for=request.POST['selectpersonalservicefor']
            m['personalservicetype']=request.POST['selectpersonalservicefor']
        elif (savr.personal_service=='No'):
            m['personalservicetype']='No'
        savr.fundraised_expense=request.POST['selectfundraisedexexpense']
        m['fundraisedexpense']=request.POST['selectfundraisedexexpense']
        savr.purchase_order=request.POST['selectpurchaseorder']
        m['purchaseorder']=request.POST['selectpurchaseorder']
        if request.POST['a'] == "":
            savr.a = "N/A"
        else:
            savr.a=request.POST['a']
            m['a']=request.POST['a']
        savr.vender_1099=request.POST['selectvender1099']
        m['vender1099']=request.POST['selectvender1099']
        savr.expense_type_1=request.POST['selectexpensetype1']
        savr.expense_invoice_1=request.POST['invoice1']
        savr.expense_descript_1=request.POST['description1']
        savr.date_1=request.POST['date1']
        savr.expense_amount_1=request.POST['amount1']
        m['expensetype1']=request.POST['selectexpensetype1']
        m['expenseinvoice1']=request.POST['invoice1']
        m['expensedescription1']=request.POST['description1']
        m['expensedate1']=request.POST['date1']
        m['expenseamount1']=request.POST['amount1']

        if request.POST['selectexpensetype2'] != "N/A":
            savr.expense_type_2=request.POST['selectexpensetype2']
            savr.expense_invoice_2=request.POST['invoice2']
            savr.expense_descript_2=request.POST['description2']
            savr.date_2=request.POST['date2']
            savr.expense_amount_2=request.POST['amount2']
            m['expensetype2']=request.POST['selectexpensetype2']
            m['expenseinvoice2']=request.POST['invoice2']
            m['expensedescription2']=request.POST['description2']
            m['expensedate2']=request.POST['date2']
            m['expenseamount2']=request.POST['amount2']
        else:
            m['expensetype2']=""
            m['expenseinvoice2']=""
            m['expensedescription2']=""
            m['expensedate2']=""
            m['expenseamount2']=""

        if request.POST['selectexpensetype3'] != "N/A":
            savr.expense_type_3=request.POST['selectexpensetype3']
            savr.expense_invoice_3=request.POST['invoice3']
            savr.expense_descript_3=request.POST['description3']
            savr.date_3=request.POST['date3']
            savr.expense_amount_3=request.POST['amount3']
            m['expensetype3']=request.POST['selectexpensetype3']
            m['expenseinvoice3']=request.POST['invoice3']
            m['expensedescription3']=request.POST['description3']
            m['expensedate3']=request.POST['date3']
            m['expenseamount3']=request.POST['amount3']
        else:
            m['expensetype3']=""
            m['expenseinvoice3']=""
            m['expensedescription3']=""
            m['expensedate3']=""
            m['expenseamount3']=""

        if request.POST['selectexpensetype4'] != "N/A":
            savr.expense_type_4=request.POST['selectexpensetype4']
            savr.expense_invoice_4=request.POST['invoice4']
            savr.expense_descript_4=request.POST['description4']
            savr.date_4=request.POST['date4']
            savr.expense_amount_4=request.POST['amount4']
            m['expensetype4']=request.POST['selectexpensetype4']
            m['expenseinvoice4']=request.POST['invoice4']
            m['expensedescription4']=request.POST['description4']
            m['expensedate4']=request.POST['date4']
            m['expenseamount4']=request.POST['amount4']
        else:
            m['expensetype4']=""
            m['expenseinvoice4']=""
            m['expensedescription4']=""
            m['expensedate4']=""
            m['expenseamount4']=""

        m['expensetotal'] = int(request.POST['amount1'])+int(request.POST['amount2'])+int(request.POST['amount3'])+int(request.POST['amount4'])
        savr.status="Pending"
        savr.comments="Any comments?"
        m['id'] = str(uuid.uuid4())
        savr.formid=m['id']
        savr.save()
        return render(request,'op.html',{'m':m})

    return render(request,'form.html')
