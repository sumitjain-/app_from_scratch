function form_validation(){
                
                    $("#name_error").html("");
                    $("#email_error").html("");
                    $("#mobnum_error").html("");
                
                var register_name = $("#register_name").val();
                var register_email = $("#register_email").val();
                var register_mobnum = $("#register_mobnum").val();                
                var valid = 1 ;
                
                if( register_name == ""){
                    $("#name_error").html("Please enter a valid name");
                    valid = 0 ;
                    
                }else{};
                
                if( register_email == ""){
                    $("#email_error").html("Please enter a valid E-mail ID");
                    valid = 0 ;
                }else{};
                
                if( register_mobnum.length != 10){
                    $("#mobnum_error").html("Please enter a valid mobile number");
                    valid = 0 ;
                }else{
                    if(register_mobnum.indexOf("+91") >= 0){
                        $("#mobnum_error").html("Please enter mobile number without country code");
                        valid = 0 ;
                    }
                };
                
                
                return valid ;
                
            }
            
            function register_device(){    
                
                
                $("#reg_key").val(regID);
                $("#reg_platform").val("iOS");
                console.log(regID);
                var form = $("#register_new"),
                    formData = form.serialize(),
                    formUrl = form.attr("action"),  
                    formMethod = form.attr('method'),
                    responseMsg = $("#register_response");
                    
                var check_form = form_validation();
                
                if(check_form){
                
                    $.ajax({  
                        url: formUrl,
                        dataType: "html",
                        type: formMethod,  
                        data: formData,  
                        success:function(data){  
                            responseMsg.html(data);
                        },
                        error:function(){
                            responseMsg.html("something went wrong");
                        }
                    });
                    
                    return false ;
                    
                }else{
                    return false ;
                }
            
            }