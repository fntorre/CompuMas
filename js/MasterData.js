function ContactCreate(storeName, dataEntity, ch_client)
{
	var ch_mensaje 	= $("#ch_description").val();
  	var cl_home_phone 	= $("#cl_home_phone").val();
	var cl_document 		= $("#cl_document").val();
  	var dir_particular = $("#cl_direccion").val();
  	var dir_laboral = $("#cl_direccion_laboral").val();
  	var cl_empresa = $("#cl_empresa").val();
  	var cl_antiguedad = $("#cl_antiguedad").val();
  	var cl_telefono_laboral = $("#cl_telefono_laboral").val();
  	var cl_referencia_personal_1 = $("#cl_referencia_personal_1").val();
  	var cl_telefono_referencial_1 = $("#cl_telefono_referencial_1").val();
  	var cl_telefono_referencial_2 = $("#cl_telefono_referencial_2").val();
  
  	var ch_type 		= "Compumas";
	
  var ch_description = "Mensaje:" + ch_mensaje + "- Dirección Particular: " + dir_particular + "- Dirección Laboral: " + dir_laboral + "- Empresa: " + cl_empresa + "- Antigüedad: " + cl_antiguedad + "- Tel. Laboral: " + cl_telefono_laboral + "- Referencia1: " + cl_referencia_personal_1 + "- Tel. Referencia 1: " + cl_telefono_referencial_1 +   "- Referencia2: " + cl_telefono_referencial_2 ; 

	var jsonCH = 	{
					"client": ch_client.replace("CL-",""),
					"description": ch_description,
					"type": ch_type
					};

	//var urlCO = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/" + dataEntity + "/documents/";
	var urlCH = "/api/dataentities/CR/documents/";

	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(jsonCH),
		type: 'PATCH',
		url: urlCH,
		success: function (data) {
		  console.log(data);
		  ResetMessages()
		  $("#ch_message_success").show();
		  $("#cl_first_name").val("");
		  $("#cl_last_name").val("");
		  $("#cl_email").val("");
		  $("#cl_home_phone").val("");
		  $("#cl_document").val("");
		  $("#ch_type").val("");
		  $("#ch_description").val("");
		},
		error: function (data) {
		  console.log(data);
		  ResetMessages()
		  $("#ch_message_error").show();
		  console.log("Error 1");
		}
	});
}

function ContactCreateByEmail(storeName, dataEntity, cl_email)
{
	//var cl_url = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/CL/search/?email=" + cl_email + "&_fields=id";
	var cl_url = "/api/dataentities/CL/search/?email=" + cl_email + "&_fields=id";
	
	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		type: 'GET',
		url: cl_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data[0].id);
			}else{
				ResetMessages()
				$("#ch_message_error").show();
				console.log("Error 2");
			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			$("#ch_message_error").show();
			console.log("Error 3");
		}
	});
}

function ClientCreate()
{
	var storeName		= $("#master_data_store_name").val();
	var dataEntity		= $("#master_data_data_entity").val();
	var cl_document 		= $("#cl_document").val();
	var cl_first_name 	= $("#cl_first_name").val();
	var cl_last_name 	= $("#cl_last_name").val();
	var cl_email 		= $("#cl_email").val();
  	var cl_home_phone 	= $("#cl_home_phone").val();
	
	
	var cl_json = 	{
					"firstName": cl_first_name,
					"lastName": cl_last_name,
					"email": cl_email,
					"homePhone": cl_home_phone,
      				"document": cl_document,
					};

	//var cl_url = "http://api.vtexcrm.com.br/" + storeName + "/dataentities/CL/documents/";
	var cl_url = "/api/dataentities/CL/documents/";
	
	$.ajax({
		headers: {
			"Accept": "application/vnd.vtex.ds.v10+json",
			"Content-Type": "application/json"
		},
		data: JSON.stringify(cl_json),
		type: 'PATCH',
		url: cl_url,
		success: function(data, textStatus, xhr){
			console.log(data);
			if(xhr.status == "200" || xhr.status == "201"){
				ContactCreate(storeName, dataEntity, data.Id);
			}else if(xhr.status == "304"){
				ContactCreateByEmail(storeName, dataEntity, cl_email);
			}else{
				ResetMessages()
				$("#ch_message_error").show();
				console.log("Error 4");
			}
		},
		error: function(data){
			console.log(data);
			ResetMessages()
			$("#ch_message_error").show();
			console.log("Error 5");
		}
	});
}


function ResetMessages()
{
	$("#ch_message_loading").hide();
	$("#ch_message_validate").hide();
	$("#ch_message_success").hide();
	$("#ch_message_error").hide();
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function FormValidate()
{
	var isFormValidate = true;

	if($("#cl_first_name").val() == ""){
		isFormValidate = false;
		$("#cl_first_name").focus();
	}
	if((isFormValidate) && ($("#cl_last_name").val() == "")){
		isFormValidate = false;
		$("#cl_last_name").focus();
	}
	if((isFormValidate) && ($("#cl_email").val() == "")){
		isFormValidate = false;
		$("#cl_email").focus();
	}
	if((isFormValidate) && (!IsEmail($("#cl_email").val()))){
		isFormValidate = false;
		$("#cl_email").val("");
		$("#cl_email").focus();
	}
	if((isFormValidate) && ($("#cl_home_phone").val() == "")){
		isFormValidate = false;
		$("#cl_home_phone").focus();
	}
	/*if((isFormValidate) && ($("#ch_type").val() == "")){
		isFormValidate = false;
		$("#ch_type").focus();
	}*/
	if((isFormValidate) && ($("#ch_description").val() == "")){
		isFormValidate = false;
		$("#ch_description").focus();
	}
	
	if(isFormValidate){
		ResetMessages()
		$("#ch_message_loading").show();
		ClientCreate();
      	
	}else{
		ResetMessages()
		$("#ch_message_validate").show();
	}

	return false;
}

function FormCreate(storeName, dataEntity, htmlElementId, messageLoading, messageValidation, messageSuccess, messageError){
	var htmlContent = '';


	htmlContent += '<div id="ch_message_loading" class="alert alert-info" style="display:none;">' + messageLoading + '</div>';
	htmlContent += '<div id="ch_message_validate" class="alert alert-warning" style="display:none;">' + messageValidation + '</div>';
	htmlContent += '<div id="ch_message_success" class="alert alert-success" style="display:none;">' + messageSuccess + '</div>';
	htmlContent += '<div id="ch_message_error" class="alert alert-danger" style="display:none;">' + messageError + '</div>';
	htmlContent += '<form id="ch_form" action="javascript:FormValidate();" method="post">';
	htmlContent += '<input type="hidden" id="master_data_store_name" name="master_data_store_name" value="' + storeName + '" />';
	htmlContent += '<input type="hidden" id="master_data_data_entity" name="master_data_data_entity" value="' + dataEntity + '" />';
	/*htmlContent += '<div class="col-md-6">';
	htmlContent += '<div class="form-field string required cl_first_name">';
	htmlContent += 		'<label for="cl_first_name">Nombre *</label>';
	htmlContent += 		'<input id="cl_first_name" maxlength="100" name="cl_first_name" type="text" />';
	htmlContent += '</div>';
	htmlContent += '<div class="form-field string required cl_last_name">';
	htmlContent += 		'<label for="cl_last_name">Apellidos *</label>';
	htmlContent += 		'<input id="cl_last_name" maxlength="100" name="cl_last_name" type="text" />';
	htmlContent += '</div>';
	htmlContent += '<div class="form-field string required cl_email">';
	htmlContent += 		'<label for="cl_email">E-mail *</label>';
	htmlContent += 		'<input id="cl_email" maxlength="100" name="cl_email" type="text">';
	htmlContent += '</div>';
  	htmlContent += '<div class="form-field string cl_document">';
	htmlContent += 		'<label for="cl_home_phone">Cédula </label>';
	htmlContent += 		'<input id="cl_document" maxlength="100" name="cl_document" type="text" />';
	htmlContent += '</div>';
  
	htmlContent += '<div class="form-field string cl_home_phone">';
	htmlContent += 		'<label for="cl_home_phone">Teléfono </label>';
	htmlContent += 		'<input id="cl_home_phone" maxlength="100" name="cl_home_phone" type="text" />';
	htmlContent += '</div>';
	htmlContent += '<div class="form-field string required ch_type">';
	htmlContent += 		'<label for="ch_type">Asunto *</label>';
	htmlContent += 		'<select name="ch_type" id="ch_type">';
	htmlContent += 			'<option value="">-</option>';
	htmlContent += 			'<option value="credito">Solicitar crédito</option>';
	htmlContent += 			'<option value="disponible">Consultar disponible</option>';
  	htmlContent += 			'<option value="otros">Otros</option>';
	htmlContent += 		'</select>';
	htmlContent += '</div>';
	htmlContent += '</div>';
	htmlContent += '<div class="col-md-6">';
	htmlContent += '<div class="form-field string required ch_description">';
	htmlContent += 		'<label for="ch_description">Mensaje *</label>';
	htmlContent += 		'<textarea id="ch_description" name="ch_description"></textarea>';
	htmlContent += '</div>';
	htmlContent += '<div class="form-field submit"><input id="commit" name="commit" type="submit" value="Enviar"></div>';
	htmlContent += '</div>';
	htmlContent += '</form>';*/
	
	$("#"+htmlElementId).html(htmlContent);
}