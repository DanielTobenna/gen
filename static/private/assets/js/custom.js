var site = {url:"https://excelpayinvestment.com/private"};

$(document).ready(function(){

    $(document).on('submit', '#', function(e) {
        e.preventDefault();
        var ref = $('#referer').val();
        if (ref == 'system' || ref == '') {toastr.error("Referral Link is needed for Registration.");return;}
        swal({
            position:'top',type: 'info',title:'New Account',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/Auth.php?action=new-account',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if ('error' in response) {
                            Swal.close();
                            $.each(response.error, function(index, msg) {
                                toastr.error(msg);
                            });
                        } else {
                            swal({
                                position:'top',type: 'success',title:'Registration Successful!',
                                html: "<hr>"+response.success+"<hr>",
                            }).then((result)=>{
                                window.location.href = site.url+'/dashboard';
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Creating your Account<br>Please wait, your account is been created."
        });
    });

    $(document).on('submit', '#', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Login Account',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/Auth.php?action=login-account',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if (response.status == 'error') {
                            Swal.close();
                            toastr.error(response.msg);
                        } else {
                            swal({
                                position:'top',type: 'success',title:'Login Successful!',
                                html: "<hr>"+response.msg+"<hr>",
                            }).then((result)=>{
                                window.location.href = site.url+'/dashboard';
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Validating your Account<br>Please wait, your account is been validated."
        });
    });

    $(document).on('click', 'input[name="plan"]', function(e) {
        var plan_id = $(this).val();
        var mina = $(this).attr('mina');
        var maxa = $(this).attr('maxa');
        $('#deposit-amount').attr({min: mina,max: maxa});
    });

    $(document).on('click', 'input[name="account"]', function(e) {
        var amount = $(this).val();
        var email = $(this).attr('email');
        $('#amount').attr('max',amount);
        $.ajax({
            url: site.url+'/assets/php/User.php?action=showcase-bal',
            type: 'POST',cache: false,dataType: 'JSON',
            data: {email:email},
            success: function(response){
                $('#show-balance').load(location.href + " #show-balance>*", "");
                $('#withdraw-btn').load(location.href + " #withdraw-btn>*", "");
            }
        });
    });

    $(document).on('submit', '#deposit-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Creating Payment Invoice',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=deposit-fund',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        $('.close').click();
                        if (response.status == 'error') {
                            Swal.close();
                            toastr.error(response.msg);
                        } else {
                            swal({
                                position:'top',type: 'success',title:'Deposit Payment Invoice Created!',
                                html: "<hr>"+response.msg+"<hr>",
                            }).then((result)=>{
                                window.location.href = site.url+'/active-deposits';
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Processing Deposit Request<br>Please wait, payment invoice is been created."
        });
    });

    $(document).on('submit', '#account-link-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Accessing Account For Linking',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=link-account',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if (response.status == 'error') {
                            Swal.close();
                            toastr.error(response.msg);
                        } else {
                            swal({position:'top',type: 'success',title:'Linking Request Sent!',html: "<hr>"+response.msg+"<hr>",})
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Validating Account<br>Please wait, checking if account is active."
        });
    });

    $(document).on('submit', '#p-info-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Change Account Information',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=p-info',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if ('error' in response) {
                            Swal.close();
                            $.each(response.error, function(index, msg) {
                                toastr.error(msg);
                            });
                        } else {
                            $('.main-panel').load(location.href + " .main-panel>*", "");
                            swal({
                                position:'top',type: 'success',title:'Profile Change Successful!',
                                html: "<hr>"+response.success+"<hr>",
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Saving Account Info<br>Please wait, account info is been saved."
        });
    });

    $(document).on('submit', '#bank-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Change Bank Account Information',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=bank-info',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if ('error' in response) {
                            Swal.close();
                            $.each(response.error, function(index, msg) {
                                toastr.error(msg);
                            });
                        } else {
                            $('.main-panel').load(location.href + " .main-panel>*", "");
                            swal({
                                position:'top',type: 'success',title:'Bank Info Change Successful!',
                                html: "<hr>"+response.success+"<hr>",
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Saving Bank Account Info<br>Please wait, account info is been saved."
        });
    });

    $(document).on('submit', '#password-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Change Account Password',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=password-change',
                    type: 'POST',cache: false,dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if ('error' in response) {
                            Swal.close();
                            $.each(response.error, function(index, msg) {
                                toastr.error(msg);
                            });
                        } else {
                            $('.main-panel').load(location.href + " .main-panel>*", "");
                            swal({
                                position:'top',type: 'success',title:'Password Change Successful!',
                                html: "<hr>"+response.success+"<hr>",
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Changing Account Password<br>Please wait, account password is been changed."
        });
    });

    $(document).on('change', '#profile-pic', function(e){
        e.preventDefault();
        var pic = $('#profile-pic').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', pic);
        var imagefile = pic.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))) {
            swal('Oops, Error','Please Select A valid Image File','error');
        } else if((pic.size/1000000) > 2.1){
            swal('Oops, Error','Image Size greater than 2MB.<br>Try Again with a different image!','error');
        } else {
            var reader = new FileReader();
            reader.onload = function(e) {
                data = '<img id="blah" src="'+reader.result+'" width="100%">';
                swal({
                    position:'top',
                    type: 'info',
                    title:'Change Profile Picture',
                    confirmButtonText:'Use',
                    reverseButtons:true,
                    showCancelButton:true,
                    cancelButtonColor:'#ff6666',
                    cancelButtonText:'Dont Use',
                    html: data,
                }).then((result)=>{
                    if (!result.value) {
                        $('#profile-pic').val('');
                    } else {
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/User.php?action=profile-photo", data: form_data, cache: false, dataType: "JSON",contentType: false,processData: false,
                            success: function(response) {
                                if (response.status == 'success') {
                                    $('.sidebar-content .photo').load(location.href + " .sidebar-content .photo>*","");
                                    $('.main-panel .profile-picture').load(location.href + " .main-panel .profile-picture>*","");
                                    toastr.success(response.msg);
                                } else if(response.status == 'error') {
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    }
                });
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    $(document).on('click', '#new-transaction', function(e){
        e.preventDefault();
        uid = $(this).attr('order');
        deposit_id = $(this).attr('deposit');
        goto_url = site.url+'/assets/php/User.php?action=new-transaction&deposit-id='+deposit_id;
        $.ajax({
            type: "POST", url: goto_url, data: {tid:uid}, cache: false, dataType: "JSON",
            success: function(response) {
                if (response.status == 'error') {
                    toastr.error(response.msg);
                } else {
                    swal({
                        position:'top',type: 'success',title:'New Payment Invoice Created!',
                        html: "<hr>"+response.msg+"<hr>",
                    }).then((result)=>{
                        window.location.href = '';
                    });
                }
            }
        });
    });

    $(document).on('click', '.start-trade', function(e){
        $('#amount').val('');
        var trader_name = $(this).attr('name');
        var trader_id = $(this).attr('id');
        var plan = 'PLAN_INVESTOR';
        var mina = $(this).attr('mina');
        var maxa = $(this).attr('maxa');
        $('#amount').attr('min', mina);
        $('#amount').attr('max', maxa);
        $('#plan').val(plan);
        $('#trader').val(trader_id);
        $('#trader-name').html(trader_name);
    });

    $(document).on('click', '#hide-amount', function(e){
        if ($('#amount').val() == '') {
            toastr.error("Minimum Withdrawal Amount is $"+$('#amount').attr('min')+" and Maximum Withdrawal Amount is $"+$('#amount').attr('max'));
        } else {
            $('#select-amount').slideUp('500', function() {
                $('#online-access').slideDown(400);
            });
        }
    });

    $(document).on('click', '#show-amount', function(e){
        $('#online-access').slideUp('500', function() {
            $('#select-amount').slideDown(400);
        });
    });


    $("#amount").blur(function(){
        var amount = parseInt($(this).val(),10);
        var mina = parseInt($(this).attr('min'),10);
        var maxa = parseInt($(this).attr('max'),10);
        if (amount < mina || amount > maxa) {
            $(this).val('');
            toastr.error("Minimum Withdrawal Amount is $"+mina+" and Maximum Withdrawal Amount is $"+maxa);
        }
    });

    $(document).on('submit', '#account-verify-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Account Verification',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=verify-account',
                    type: 'POST',
                    cache: false,
                    dataType: 'JSON',
                    data: $(this).serialize(),
                    success: function(response){
                        if (response.status == 'error') {
                            Swal.close();
                            toastr.error(response.msg);
                        } else {
                            swal({
                                position:'top',type: 'success',title:'Verification Successful',
                                html: "<hr>"+response.msg+"<hr>",
                            }).then((result)=>{
                                window.location.href = '';
                            });
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Verifying Account<br>Please wait, account is been verified."
        });
    });

    $(document).on('click', '#verification-code', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Resend Verification Code',
            onBeforeOpen: () => {
                Swal.showLoading();
                $.ajax({
                    url: site.url+'/assets/php/User.php?action=verification-code',
                    type: 'POST',
                    cache: false,
                    dataType: 'JSON',
                    data: {},
                    success: function(response){
                        if (response.status == 'error') {
                            Swal.close();
                            toastr.error(response.msg);
                        } else {
                            swal({position:'top',type: 'success',title:'Verification Code Sent',html: "<hr>"+response.msg+"<hr>"});
                        }
                    }
                });
            },allowOutsideClick:false,html: "<hr>Sending Code<br>Please wait, verification code is being sent to your email."
        });
    });

    $(document).on('click', '#unlink-me', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Unlink Account',confirmButtonText:'Unlink Account',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Confirm Account Unlinking.",
        }).then((result)=>{
            if (result.value) {
                $.ajax({
                    type: "POST", url:site.url+"/assets/php/User.php?action=unlink-me", data: {}, cache: false, dataType: "JSON",
                    success: function(response) {
                        if (response.status == 'success') {
                            $('#other-link').load(location.href + " #other-link>*","");
                            toastr.success(response.msg);
                        } else if(response.status == 'error') {
                            toastr.error(response.msg);
                        }
                    }
                });
            }
        });
    });

    $(document).on('click', '.unlink-account', function(e) {
        e.preventDefault();
        var email = $(this).attr('mail');
        swal({
            position:'top',type: 'info',title:'Unlink Account',confirmButtonText:'Unlink Account',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Confirm Account Unlinking.",
        }).then((result)=>{
            if (result.value) {
                $.ajax({
                    type: "POST", url:site.url+"/assets/php/User.php?action=unlink-account", data: {email:email}, cache: false, dataType: "JSON",
                    success: function(response) {
                        if (response.status == 'success') {
                            $('#other-link').load(location.href + " #other-link>*","");
                            toastr.success(response.msg);
                        } else if(response.status == 'error') {
                            toastr.error(response.msg);
                        }
                    }
                });
            }
        });
    });

    $(document).on('submit', '#password-reset-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Reset Password',confirmButtonText:'Reset Password',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Are you sure you want to reset your password.",
        }).then((result)=>{
            if (result.value) {
                swal({
                    position:'top',type: 'info',title:'Reset Account Password',
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/Auth.php?action=password-reset", data: $(this).serialize(), cache: false, dataType: "JSON",
                            success: function(response) {
                                if (response.status == 'success') {
                                    swal({position:'top',type: 'success',title:'Password Reset Successful!',html: "<hr>"+response.msg+"<hr>",}).then((result)=>{
                                        window.location.href = site.url;
                                    });
                                } else if(response.status == 'error') {
                                    Swal.close();
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    },allowOutsideClick:false,html: "<hr>Sending Code<br>Please wait, verification code is being sent to your email."
                });
            }
        });
    });

    $(document).on('submit', '#withdrawal-form', function(e) {
        e.preventDefault();
        swal({
            position:'top',type: 'info',title:'Withdrawal Request',confirmButtonText:'Confirm Withdrawal',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Are you sure you want to withdraw from the selected account.",
        }).then((result)=>{
            if (result.value) {
                swal({
                    position:'top',type: 'info',title:'Creating Withdrawal Request',
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/User.php?action=withdraw", data: $(this).serialize(), cache: false, dataType: "JSON",
                            success: function(response) {
                                if (response.status == 'success') {
                                    swal({position:'top',type: 'success',title:'Withdrawal Request Successful!',html: "<hr>"+response.msg+"<hr>",}).then((result)=>{
                                        window.location.href = site.url+"/withdrawal-history";
                                    });
                                } else if(response.status == 'error') {
                                    Swal.close();
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    },allowOutsideClick:false,html: "<hr>Processing Withdrawal Request<br>Please wait, your withdrawal request is being created."
                });
            }
        });
    });

    $(document).on('click', '.cash-out', function(){
        var deposit_id = $(this).attr('id');
        swal({
            position:'top',type: 'info',title:'Cashout Earnings',confirmButtonText:'Cash Out',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Your Earnings will be credited to your account balance for withdrawal.",
        }).then((result)=>{
            if (result.value) {
                swal({
                    position:'top',type: 'info',title:'Adding Earnings to Balance',
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/User.php?action=cashout", data: {deposit_id:deposit_id}, cache: false, dataType: "JSON",
                            success: function(response) {
                                if (response.status == 'success') {
                                    swal({position:'top',type: 'success',title:'Cashout Request Successful!',html: "<hr>"+response.msg+"<hr>",}).then((result)=>{
                                        window.location.href = '';
                                    });
                                } else if(response.status == 'error') {
                                    Swal.close();
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    },allowOutsideClick:false,html: "<hr>Processing Cashout Request<br>Please wait, your earning is being added to your account balance."
                });
            }
        });
    });
    
    $(document).on('click', '.reinvest', function(){
        var deposit_id = $(this).attr('id');
        swal({
            position:'top',type: 'info',title:'Auto Re-investment',confirmButtonText:'Re-invest Now',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Confirm that you want to Re-invest this matured investment.",
        }).then((result)=>{
            if (result.value) {
                swal({
                    position:'top',type: 'info',title:'Re-investing matured investment',
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/User.php?action=reinvest", data: {deposit_id:deposit_id}, cache: false, dataType: "JSON",
                            success: function(response) {
                                if (response.status == 'success') {
                                    swal({position:'top',type: 'success',title:'Fund Re-investment Successful!',html: "<hr>"+response.msg+"<hr>",}).then((result)=>{
                                        window.location.href = '';
                                    });
                                } else if(response.status == 'error') {
                                    Swal.close();
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    },allowOutsideClick:false,html: "<hr>Processing Fund Re-investment<br>Please wait, selected matured earning is being re-invested."
                });
            }
        });
    });

    $(document).on('click', '.i-paid', function(){
        var deposit_id = $(this).attr('id');
        swal({
            position:'top',type: 'info',title:'Payment Completed',confirmButtonText:'I have Paid',reverseButtons:true,showCancelButton:true,cancelButtonColor:'#ff6666',html: "Confirm that you have completed this payment.",
        }).then((result)=>{
            if (result.value) {
                swal({
                    position:'top',type: 'info',title:'Completing Payment',
                    onBeforeOpen: () => {
                        Swal.showLoading();
                        $.ajax({
                            type: "POST", url:site.url+"/assets/php/User.php?action=i-paid", data: {deposit_id:deposit_id}, cache: false, dataType: "JSON",
                            success: function(response) {
                                if (response.status == 'success') {
                                    swal({position:'top',type: 'success',title:'System Notified!',html: "<hr>"+response.msg+"<hr>",}).then((result)=>{
                                        window.location.href = '';
                                    });
                                } else if(response.status == 'error') {
                                    Swal.close();
                                    toastr.error(response.msg);
                                }
                            }
                        });
                    },allowOutsideClick:false,html: "<hr>Processing Cashout Request<br>Please wait, lets notify the system of your payment."
                });
            }
        });
    });

});