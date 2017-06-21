window.onload = function() {
    $('.datepicker')
        .attr('type', 'text')
        .datepicker({
            dateFormat: 'mm/dd/y'
    });

    $("#pickUpRadio").change(function(){
        $("#pickUpName").val($('#payto').val());
    });

    $("#mailToRadio").change(function(){
        $("#pickUpName").val("");
    });

    $("#pickUpName").on('click', function(){
        $("#pickUpRadio").prop('checked', true);
    });

	$('input:radio[name="paymentType"]').change(function() {
		$('style').text("@media screen {.translucent-mailTo {z-index: 0;} .translucent-pickUpName {z-index: 0;} }")
	});

	$('input:radio[name="paymentType"]').filter('[value="paymentType-transfer"]').change(function() {
		var pickUpValue = $("#pickUpName").val()
        $("#pickUpName").val("");
		$("#pickUpRadio").prop('checked', false);
		$("#mailToRadio").prop('checked', false);
		$('style').text("@media screen {.translucent-mailTo {z-index: 2;} .translucent-pickUpName {z-index: 2;} }")
	});

    $(".transferOrganization").change(function(){
        $('input:radio[name="paymentType"]').filter('[value="paymentType-transfer"]').prop('checked', true);
		$("#pickUpName").val("");
		$("#pickUpRadio").prop('checked', false);
		$("#mailToRadio").prop('checked', false);
		$('style').text("@media screen {.translucent-mailTo {z-index: 2;} .translucent-pickUpName {z-index: 2;} }")

    });

    $(".paymentType input[type='radio']").change(function(){
        $('.transferOrganization').val('0000');
    });

    $(".separateCheck").css("display", "none");
    $(".background-separateCheck").css("display", "none");

    var hashParams = window.location.hash.substr(1).split('&');

    if (hashParams[0] == "internal") {
        $('input[type="text"]').keyup(savePage);
        $('input[type="text"]').change(savePage);
        $('textarea').keyup(savePage);
        $('input[type="radio"]').change(savePage);
        $('input[type="checkbox"]').change(savePage);
        $('select').change(savePage);
        $(".separateCheck").css("display", "inherit");
        $(".background-separateCheck").css("display", "inherit");
    };

    if (hashParams[0] == "occt" || hashParams[1] == "occt") {
        $("#logo").attr("src","../media/OCCT_Logo_Voucher.png");
    };

    printDate();
    textareaLimit();
    getData();
    errorCheck();
};

function textareaLimit() {
    for (i = 1; i < 7; i++) {
        var prev = "",
            tArea = document.getElementById("limit" + i);

        if ("onpropertychange" in tArea && !("oninput" in tArea)) {
            tArea.onpropertychange = function () {
                if (window.event.propertyName == "value")
                    this.oninput();
            }
        };

        tArea.oninput = function () {
            var opc = this.onpropertychange;
            this.onpropertychange = null;

            if (this.scrollHeight > this.offsetHeight) {
                this.value = prev;
            }
            prev = this.value;
            if (opc)
                this.onpropertychange = opc;
        };
    };
};

function printDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yy = today.getFullYear();

    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    var today = "Date: " + mm + '/' + dd + '/' + yy;

    document.getElementById('currentDate').innerHTML = today;
};

function getData() {
    // $.get('../data/organizations.txt', function(data) {
    //     var r = $.Deferred();
    //     var orgs = new Array;
    //     var orgs = data.split(/\r?\n/);
	//
    //     for (i = 0; i < orgs.length; i++) {
    //         var orgsID = new Array;
    //         var orgsID = orgs[i].split(" ");
    //         $( ".organizationSelect" ).append( "<option value='" + orgsID[0] + "'>" + orgs[i] + "</option>");
    //     }
    //     getParams();
    // });

    $.get('../data/expense-codes.txt', function(data) {
        var codes = new Array;
        var codes = data.split(/\r?\n/);

        for (i = 0; i < codes.length; i++) {
            var codesID = new Array;
            var codesID = codes[i].split(" ");
            $( ".expenseSelect" ).append( "<option value='" + codesID[0] + "'>" + codes[i] + "</option>");
        }
        getParams();
    });

    $.get('../data/personal-service.txt', function(data) {
        var codes = new Array;
        var codes = data.split(/\r?\n/);

        for (i = 0; i < codes.length; i++) {
            var codesID = new Array;
            var codesID = codes[i].split(" ");
            $( ".personalServiceSelect" ).append( "<option value='" + codesID[0] + "'>" + codes[i] + "</option>");
        }
        getParams();
    });
};

function getParams() {
    var hashParams = window.location.hash.substr(1).split('&');

    if (hashParams[0] == "internal") {
        $("#savebutton").css("display", "inline");
        $("#clearbutton").css("display", "inline");
        for(var i = 1; i < hashParams.length; i++){
            var p = hashParams[i].split('=');
            $("." + p[0]).val(decodeURIComponent(p[1]));
            $('input:radio[name=' + p[0] + ']').filter('[value="' + p[1] + '"]').attr('checked', true);
            if(p[1] = true) {
                $('input:checkbox[name=' + p[0] + ']').prop('checked', true);
            }
        };

    };

	if ($('input:radio[name="paymentType"]').filter('[value="paymentType-transfer"]').prop('checked') == true) {
		$('style').text(".translucent-mailTo {z-index: 2;} .translucent-pickUpName {z-index: 2;}")
	}
    errorCheck();
    findTotal();
};

function printPage() {
    window.print()
};

function savePage() {
    saveList = ["payto", "al1", "al2", "al3", "pn", "yourOrganization", "transferOrganization", "pickUpNameInput", "paymentType", "deliveryType", "personalService", "personalServiceSelect", "1099Vendor" , "separateCheckInput", "fundraised", "purchaseOrder", "des1", "des2", "des3", "des4", "des5", "des6", "exp1", "exp2", "exp3", "exp4", "exp5", "exp6", "inv1", "inv2", "inv3", "inv4", "inv5", "inv6", "dat1", "dat2", "dat3", "dat4", "dat5", "dat6", "amt1", "amt2", "amt3", "amt4", "amt5", "amt6"]

    var url = window.location.href.split("#")

    if ((url[1].split("&"))[1] == "occt") {
        url = url[0] + "#internal&occt"
    } else if ((url[1].split("&"))[0] == "occt") {
        url = url[0] + "#occt"
    } else if ((url[1].split("&"))[0] == "internal") {
        url = url[0] + "#internal"
    }

    for(var i = 0; i < saveList.length; i++){

        if(saveList[i] == "paymentType" || saveList[i] == "deliveryType") {
            var itemValue =  $('input:radio[name=' + saveList[i] + ']:checked').val();
        } else if (saveList[i] == "personalService" || saveList[i] == "1099Vendor" || saveList[i] == "separateCheckInput" || saveList[i] == "fundraised" || saveList[i] == "purchaseOrder") {
            var itemValue = $('input:checkbox[name=' + saveList[i] + ']').is(':checked')
        } else {
            var itemValue = $("." + saveList[i]).val();
        };

        if (saveList[i] == "yourOrganization" && itemValue == "0000" || saveList[i] == "transferOrganization" && itemValue == "0000" || saveList[i] == "personalServiceSelect" && itemValue == "0000" || itemValue == "" || saveList[i] == "paymentType" && typeof itemValue === "undefined" || saveList[i] == "deliveryType" && typeof itemValue === "undefined" || saveList[i] == "exp1" && itemValue == "0000" || saveList[i] == "exp2" && itemValue == "0000" || saveList[i] == "exp3" && itemValue == "0000" || saveList[i] == "exp4" && itemValue == "0000" || saveList[i] == "exp5" && itemValue == "0000" || saveList[i] == "exp6" && itemValue == "0000" ) {

        } else {
            var url = url + "&" + encodeURIComponent(saveList[i]) + "=" + encodeURIComponent(itemValue)
        }

    };

    if(url.length > 2000) {
        alert("WARNING: The length of your save page URL is greater than 2000 characters. All data may not be saved.")
    }

    for (var i = 0; i < 7; i++) {
        parseFloat($(".amt" + i).val()).toFixed(2)
    }

    $(document).prop('title', $('.payto').val());

    window.location.replace(url);

}

function resetPage() {
    $('input').val('');
    $('input:radio').attr('checked', false);
    $('input:checkbox').attr('checked', false);
    $('select').val('0000');
    $('textarea').val('');
    savePage()
}

function errorCheck() {
    var yourOrganization = $('#yourOrganization').val();
    var purchaseOrderInput = $("#purchaseOrderInput").val();

    if (yourOrganization == '0000') {
        document.getElementById('errorMessage').innerHTML = 'Please select your organization.';
    } else if ($('#purchaseOrderCheckbox').is(':checked') && purchaseOrderInput == "") {
        document.getElementById('errorMessage').innerHTML = 'Please enter a \'Purchase Order\'<br>number.';
    } else {
       document.getElementById('errorMessage').innerHTML = '';
    }
}

function findTotal() {
    var arr = document.getElementsByName('amount');
    var tot = 0;

    for (var i = 0; i < arr.length; i++) {
        var value = parseFloat(arr[i].value);
        if(value) {
            tot += value
		}
    }
    tot = tot.toFixed(2)
    var total = tot.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    document.getElementById('total').value = "$" + total;
};

function fixit(obj) {
    if (isNaN(parseFloat(obj.value).toFixed(2))) {
        obj.value = ""
    } else {
        obj.value = parseFloat(obj.value).toFixed(2);
    }
};
