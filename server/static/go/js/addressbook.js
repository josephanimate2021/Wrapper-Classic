var URL_IMPORT_GMAIL="/ajax/importgmail";var URL_ADDRESS_BOOK="/ajax/addressbook";var URL_IMPORT_ALL_CONTACT="/ajax/getAllAddress";var URL_SEND_INVITE="/ajax/sendInvite";var URL_IMPORT_YAHOO="/ajax/importyahoo";var URL_YAHOO_ADDRESSBOOK="/ajax/yahooAddressbookAuth";var URL_LOGIN_CONTACT="/ajax/importcontacts";var URL_GET_USER_CONTACT="/ajax/getUserVars";var URL_SEND_SHARE="/ajax/sendShare";var URL_FETCH_PREVIEW="/ajax/fetchMailPreview";var URL_SECURE_LOGIN_CONTACT="http://"+location.hostname+"/ajax/importcontacts";var ddd="";var inviteContactName="rcpt_ml_area";var userAdded=function(a){};var userRemoved=function(a){};google.load("gdata","1.x");Picker.setServiceName("GoAnimate.com Address Book");Picker.setUserAddCallback(userAdded);Picker.setUserRemoveCallback(userRemoved);function CheckAll(a){if(a.length==undefined){a.checked=true}else{for(i=0;i<a.length;i++){a[i].checked=true}}}function UnCheckAll(a){if(a.length==undefined){a.checked=false}else{for(i=0;i<a.length;i++){a[i].checked=false}}}function importFromGmail(){var b=$("contactlist");var a=$("importgmail");var c=$("importyahoo");b.style.display="none";c.style.display="none";a.style.display="block";Picker.render("picker_container")}function importFromYahoo(){var c=$("contactlist");var b=$("importgmail");var d=$("importyahoo");var a=$("page_name").innerHTML;c.style.display="none";d.style.display="block";b.style.display="none";yddd=window.setInterval('printDot("LoadingContactddd")',300);new Ajax.Request(URL_YAHOO_ADDRESSBOOK+"/"+a,{method:"post",onSuccess:function(f){var e=f.responseText;parseResponse(e);$("yahooloading").style.display="none";window.clearInterval(yddd);if(responseArray.code=="0"){importyahoocss();d.innerHTML=responseArray.html}else{displayFeedback(responseArray.code+responseArray.json.error)}},onFailure:function(){displayFeedback("1Error contacting the server")}})}function importyahoocss(){var a="yahoo_import_container";var b=document.createElement("style");b.setAttribute("type","text/css");var c="      #"+a+" {        font: 100% Arial, sans-serif;        -moz-border-radius: 3px;        -webkit-border-radius: 3px;        position: relative;        top: 0.5em;      }            #"+a+" div {        height: 100%;        float: left;        margin: 0;        padding: 0;      }            #"+a+" div#yahoo_header_pane {        height: 32px;        background: transparent url(/static/go/img/v2/nav_bg.gif) repeat-x scroll 0 0;        vertical-align: middle;        width: 100%;      }            #"+a+" div#yahoo_groups_container {        width: 25%;        height: 200px;        position: relative;        border-right: 2px solid #c3d9ff;      }            #"+a+" div#yahoo_contacts_container {        width: 70%;        height: 200px;        position: relative;        border-right: 2px solid #c3d9ff;      }            #"+a+" div#yahoo_info_container {        width: 33%;        height: 200px;        position: relative;      }            #"+a+" div.yahoo_column {        width: 100%;      }            #"+a+" div#yahoo_groups_pane {        position: static;        overflow: auto;      }            #"+a+" div#yahoo_groups_pane li {        overflow: hidden;      }            #"+a+" div#yahoo_groups_pane li a {        width: 9999%;      }            #"+a+" div#yahoo_contacts_pane {        position: static;        overflow: auto;      }            #"+a+" div#yahoo_contacts_pane li {        overflow: hidden;      }            #"+a+" div#yahoo_contacts_pane li a {        width: 9999%;      }            #"+a+" div#yahoo_info_pane {        width: 100%;        position: relative;        overflow: auto;      }            #"+a+" div#yahoo_footer_pane {        height: 32px;        background-color: #ACCBE0;        vertical-align: middle;        width: 100%;        clear: both;        /*float: none;*/      }            #"+a+" #yahoo_title {        font-weight: bold;        margin: 0;        padding: 0.4em;        height: 100%;        vertical-align: middle;        font-size: 125%;      }            #"+a+" ul {        list-style-type: none;        padding: 0;        margin: 0;      }            #"+a+" li {        margin: 0;        padding: 2px 5px;        height: 1.3em;        line-height: 1.3em;      }            #"+a+" li input {        margin: 0 3px;      }            #"+a+" li.yahoo_endspecial {        border-bottom: 1px solid #c3d9ff;      }            #"+a+" li a {        display: block;        color: #000;        text-decoration: none;      }            #"+a+" li.yahoo_selected, #"+a+" li.yahoo_selected:hover {        background-color: #c3d9ff;        color: #0000cc;        font-weight: bold;      }            #"+a+" li.yahoo_selected a, #"+a+" li.yahoo_selected:hover a {        color: #0000cc;      }            #"+a+" li:hover {        background-color:  #ffffcc;      }            #"+a+" .yahoo_info_block {        float: none;        width: 95%;        position: static;        padding: 0.5em;        height: auto;      }            #"+a+" #yahoo_info_pane p {        margin: 0;        padding: 0;      }            #"+a+" .yahoo_info_title {        font-weight: bold;        font-size: 1.1em;      }            #"+a+" .yahoo_info_meta {        color: #777;      }            #"+a+" #yahoo_logout {        margin: 0 1em;        line-height: 32px;      }            #"+a+" #yahoo_logout a {        text-decoration: none;      }";if(b.styleSheet){b.styleSheet.cssText=c}else{var d=document.createTextNode(c);b.appendChild(d)}document.getElementsByTagName("head")[0].appendChild(b)}function yahooSignin(a){location.href=a}function showContact(){if($("json_user").innerHTML=="1"){var a=get_cookie("gmaillogin");if(a=="1"){delete_cookie("gmaillogin")}var c=$("contactlist");var b=$("importgmail");var d=$("importyahoo");c.style.display="block";d.style.display="none";b.style.display="none"}else{showAddressBook(false);grayOut(false,"showInviteAddressBook")}}function checkGmailProcess(){var a=get_cookie("gmaillogin");if(a=="1"){showAddressBook(true)}}function checkYahooProcess(){var a=get_cookie("yahoologin");if(a=="1"){showAddressBook(true)}}function showInvitePreview(b){var a=$("overlayInvitePreview");if(b){if(a!=null){a.style.display="block";$("sndr_nm_text").innerHTML=$("sndr_nm_input").value;$("sndr_ml_text").innerHTML=$("sndr_ml_input").value;INVITE_FRIEND_FOOTER=INVITE_FRIEND_FOOTER.replace(/<<<username>>>/g,$("sndr_nm_input").value);INVITE_FRIEND_FOOTER=INVITE_FRIEND_FOOTER.replace(/<<<useremail>>>/g,$("sndr_ml_input").value);if($("cntnt_area").value==""){$("preview_area").value=INVITE_FRIEND_STANDARD_MSG+INVITE_FRIEND_FOOTER}else{$("preview_area").value=$("cntnt_area").value+INVITE_FRIEND_FOOTER}}}else{a.style.display="none"}}function showSharePreview(b){var a=$("overlaySharePreview");if(b){if(a!=null){a.style.display="block";$("sndr_nm_text").innerHTML=$("sndr_nm_input").value;$("sndr_nm_text2").innerHTML=$("sndr_nm_input").value;$("sndr_ml_text").innerHTML=$("sndr_ml_input").value;if(call_src==""){new Ajax.Request(URL_FETCH_PREVIEW,{method:"post",parameters:new Hash({type:"movieshare",sendername:$("sndr_nm_input").value,senderemail:$("sndr_ml_input").value,movie:$("movieId").value,msg:($("cntnt_area").value==""?SHARE_EMAIL_STANDARD_MSG:$("cntnt_area").value)}),onSuccess:function(c){parseResponse(c.responseText);if(responseArray.code=="0"){$("preview_area").value=responseArray.json.emailText}}})}else{if(call_src=="faf"||call_src=="invite"){new Ajax.Request(URL_FETCH_PREVIEW,{method:"post",parameters:new Hash({type:"invite",sendername:$("sndr_nm_input").value,senderemail:$("sndr_ml_input").value,msg:($("cntnt_area").value==""?SHARE_EMAIL_STANDARD_MSG:$("cntnt_area").value)}),onSuccess:function(c){parseResponse(c.responseText);if(responseArray.code=="0"){$("preview_area").value=responseArray.json.emailText}}})}}}}else{a.style.display="none"}}function showAddressBook(e){if(e=="ymail"){var a=true}if(e=="gmail"){var d=true}if($("overlayAddressbook")==null){flashAppName="Studio"}if($("sndr_nm_box")!=null){flashAppName="Invite"}var b=$("overlayAddressbook");if(b==null){b=$("overlayStudioAddressbook")}var c=$("overlayAddressBar");if(!e){b.style.display="none";if(c!=null){c.style.display="none"}return}new Ajax.Request(URL_ADDRESS_BOOK+"/"+flashAppName,{method:"post",onSuccess:function(h){var g=h.responseText;parseResponse(g);if(responseArray.code=="0"){b.innerHTML=responseArray.html;if(e){if(b!=null){b.style.display="block"}if(c!=null){c.style.display="block"}var f=get_cookie("gmaillogin");if(f=="1"||(d!=null&&d)){importFromGmail()}else{if(a!=null&&a){importFromYahoo()}else{showContact()}}}}else{displayFeedback(responseArray.code+responseArray.json.error)}},onFailure:function(){displayFeedback("1Error contacting the server")}})}function importEmailContacts(e,d){if($("json_user").innerHTML=="1"){new Ajax.Request(URL_IMPORT_GMAIL,{method:"post",parameters:$(e).serialize(),onSuccess:function(h){var g=h.responseText;parseResponse(g);if(responseArray.code=="0"){displayFeedback(responseArray.code+d+" contacts successfully imported.");showAddressBook(true)}else{displayFeedback(responseArray.code+responseArray.json.error)}},onFailure:function(){displayFeedback("1Error contacting the server");$(e).enable()}})}else{var f="";var c=0;var a=document.getElementById("contact_selector_"+c);while(a!=null&&c<10){if(a.checked==true){var b=a.value;b=b.split(";");if($("rcpt_ml_area")==null){f+=b[1]+","}else{f+=b[1]+"\n"}}c++;a=document.getElementById("contact_selector_"+c)}f=f.substr(0,f.length-1);if($("rcpt_ml_area")==null){add2flash(f)}else{add2form(f)}showAddressBook(false);grayOut(false,"showInviteAddressBook")}}function importAllContacts(a){new Ajax.Request(URL_IMPORT_ALL_CONTACT+"/"+a,{method:"post",onSuccess:function(d){var b=d.responseText;parseResponse(b);if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(responseArray.code=="0"){displayFeedback(responseArray.code+"All contacts are successfully added");$("rcpt_ml_area").value=responseArray.json.email_list;var c=responseArray.json.email_list.split(",");$("import_all_num").innerHTML=c.length}else{displayFeedback(responseArray.code+responseArray.json.error)}}resetResponse()},onFailure:function(){displayFeedback("1Error contacting the server")}})}function checkSelectNum(c,b){var a=b;$("listing_counter").innerHTML="&nbsp;";for(i=0;i<document.contactform.mlist.length;i++){if(document.contactform.mlist[i].checked==true){a--}}if(a<=6&&a>0){$("listing_counter").style.color="orange";$("listing_counter").innerHTML=a+" remaining"}else{if(a<=0){$("listing_counter").style.color="red";$("listing_counter").innerHTML="reached maximum "+b}}if(a<0){if(c.checked==true){c.checked=false;alert("Oops, maximum "+b+" messages reached.\nPlease unselect one to choose this one.")}}}function showPreview(a){if(validateInviteForm(a)){grayOut(true,"showEmailPreview");showInvitePreview(true)}}function clearInviteForm(){$("nvtfrm").reset();$("rcpt_ml_area").value=""}function validateInviteForm(a){$("errMsg").innerHTML="&nbsp;";$("sndr_nm_ttl").style.color="black";$("sndr_ml_ttl").style.color="black";$("rcpt_ml_ttl").style.color="black";if($("sndr_nm_input").value==""){$("errMsg").innerHTML="Please enter Your Name";$("sndr_nm_ttl").style.color="red";return false}if($("sndr_ml_input").value==""){$("errMsg").innerHTML="Please enter Your Email";$("sndr_ml_ttl").style.color="red";return false}if($("rcpt_ml_area").value==""){$("errMsg").innerHTML="Please enter Your Friend Emails";$("rcpt_ml_ttl").style.color="red";return false}if(validateEmailList()>a){$("errMsg").innerHTML="Over maximum of "+a+" email addresses";$("rcpt_ml_ttl").style.color="red";return false}var b=$("rcpt_ml_area").value;if(b.indexOf(",")>=0){$("errMsg").innerHTML="Please remove commas in Your Friend Emails";$("rcpt_ml_ttl").style.color="red";return false}return true}function validateEmailList(){var a=$("rcpt_ml_area").value;a=a.split("\n");return a.length}function sendInvite(a){if(validateInviteForm(a)){var b=$("rcpt_ml_area").value;b=b.replace(/\r\n/g,",");b=b.replace(/\n/g,",");$("rcpt_ml_area").value=b;$("cntnt_subject").value=$("sndr_sub").innerHTML+$("sndr_nm_text2").innerHTML;ddd=window.setInterval('printDot("dotdotdot")',300);grayOut(true,"sendInviteEmail");$("overlaySending").style.display="block";new Ajax.Request(URL_SEND_INVITE,{method:"post",parameters:$("nvtfrm").serialize(),onSuccess:function(d){var c=d.responseText;sendInviteComplete(c)},onFailure:function(){displayFeedback("1Error contacting the server");$("nvtfrm").enable();grayOut(false,"sendInviteEmail");$("overlaySending").style.display="none";window.clearInterval(ddd)}});$("nvtfrm").disable()}}function sendInviteComplete(b){parseResponse(b);$("nvtfrm").enable();switch(responseArray.code){case"0":_gaq.push(["_trackPageview","/pageTracker/ajax/emailInvite/postComplete"]);location.href=responseArray.json.url;break;case"1":$("captcha_type").setAttribute("value","image");$("captcha_id").setAttribute("value",responseArray.json.session_id);$("captcha_image").setAttribute("src",responseArray.json.url);$("comment_captcha").style.display="block";$("image_captcha").style.display="block";$("audio_captcha").style.display="none";$("inviterighttop").style.height="350px";var a=$("rcpt_ml_area").value;a=a.replace(/,/g,"\n");$("rcpt_ml_area").value=a;break;case"2":$("captcha_type").setAttribute("value","audio");$("captcha_id").setAttribute("value",responseArray.json.session_id);$("captcha_audio").innerHTML=getAudioEmbedString(responseArray.json.url);$("comment_captcha").style.display="block";$("image_captcha").style.display="none";$("audio_captcha").style.display="block";$("inviterighttop").style.height="350px";var a=$("rcpt_ml_area").value;a=a.replace(/,/g,"\n");$("rcpt_ml_area").value=a;break;case"3":default:displayFeedback(responseArray.code+responseArray.json.error);break}grayOut(false,"sendInviteEmail");$("overlaySending").style.display="none";window.clearInterval(ddd);resetResponse()}function showContactCancel(){window.clearInterval(lddd);$("overlayObject").style.margin="150px 0px 0px 0px";$("overlayContact").style.display="block";$("overlayLoadingContact").style.display="none";$("overlayContactFound").style.display="none";$("overlayContactList").style.display="none";$("overlayShareComplete").style.display="none";$("overlaySharePreview").style.display="none";$("overlayCaptcha").style.display="none";$("overlayContactLogin").style.display="block";$("contactLoginForm").style.display="block";$("contactShareForm").style.display="block";$("emailshare_captcha_id").setAttribute("value","")}function sendAnotherEmail(){_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/sendAnotherEmail"]);$("cntnt_area").value=SHARE_EMAIL_STANDARD_MSG+"\n";showContactCancel()}var call_src="";function showContactOverlay(c,d){var b=currPos();b[1]=b[1]-246;$("overlayContact").style.top=b[1]+"px";window.clearInterval(lddd);if(c){if(d==undefined){$("overlayShareEmail").style.display="block";$("overlayShareEmail").style.top=b[1]+60+"px";var a="";if(typeof video_ecard!="undefined"&&video_ecard){a="/1"}$("eaf_body").innerHTML='<iframe id="ab" src="/email_a_friend/share_movie/'+$("eaf_movie_enc_id").innerHTML+a+'" frameborder="0" scrolling="no" style="width:640px;height:370px;-webkit-border-radius:10px;-moz-border-radius:10p;border-radius:10px"></iframe>';grayOut(true,"showEmailContact")}else{if(d=="faf"){call_src=d;$("overlayContactTitle").innerHTML=GT.gettext("Invite your friends to GoAnimate");$("overlayContact").style.display="block";grayOut(true,"findFriends/showEmailContact")}}}else{if(call_src==""){$("overlayShareEmail").style.display="none";grayOut(false,"showEmailContact");$("eaf_body").innerHTML=""}else{if(call_src=="faf"){$("overlayContact").style.display="none";grayOut(false,"findFriends/showEmailContact")}}}}var lddd="";function contactLogin(e){var d=$(e);$("contactLoginErr").innerHTML="&nbsp;";if(d.username.value==""){$("contactLoginErr").innerHTML=GT.gettext("Please enter email");return}if(d.passwd.value==""){$("contactLoginErr").innerHTML=GT.gettext("Please enter password");return}var h=d.username.value;var g=h.substring(0,h.lastIndexOf("@")+1);var c=h.substring(g.length,h.length+1);var b=GT.gettext("Import Contacts from <PROVIDER>");if(c.indexOf("gmail")!=-1){$("contactProvider").innerHTML="<img src='/static/go/img/email_import/logo_gmail.gif'>";$("contactProviderHeader").innerHTML=b.replace("<PROVIDER>","<img src='/static/go/img/email_import/logo_gmail_s.gif'>")}else{if(c.indexOf("yahoo")!=-1||c.indexOf("ymail")!=-1){$("contactProvider").innerHTML="<img src='/static/go/img/email_import/logo_yahoo.gif'>";$("contactProviderHeader").innerHTML=b.replace("<PROVIDER>","<img src='/static/go/img/email_import/logo_yahoo_s.gif'>")}else{if(c.indexOf("aol")!=-1||c.indexOf("aim.com")!=-1){$("contactProvider").innerHTML="<img src='/static/go/img/email_import/logo_aol.gif'>";$("contactProviderHeader").innerHTML=b.replace("<PROVIDER>","<img src='/static/go/img/email_import/logo_aol_s.gif'>")}else{if(c.indexOf("hotmail")!=-1||c.indexOf("live")!=-1||c.indexOf("msn.com")!=-1||c.indexOf("passport.com")!=-1){$("contactProvider").innerHTML="<img src='/static/go/img/email_import/logo_window.gif'>";$("contactProviderHeader").innerHTML=b.replace("<PROVIDER>","<img src='/static/go/img/email_import/logo_windowLive_s.gif'>")}else{$("contactLoginErr").innerHTML=GT.gettext("Please enter an email from supported providers");return}}}}_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/OpenInviterEmailImport"]);$("overlayContactLogin").style.display="none";$("overlayLoadingTextGo").style.display="none";$("overlayLoadingTextOI").style.display="block";$("overlayLoadingTextSnd").style.display="none";$("overlayLoadingContact").style.display="block";lddd=window.setInterval('printDot("LoadingDotDotDot")',300);var a=navigator.userAgent;a=a.toLowerCase();new Ajax.Request(URL_LOGIN_CONTACT,{method:"post",parameters:d.serialize(),onSuccess:function(j){var f=j.responseText;contactLoginCallback(f,e)},onFailure:function(){displayFeedback("1Error contacting the server");d.enable();window.clearInterval(lddd)}});d.disable()}function contactLoginCallback(c,b){var a=$(b);parseResponse(c);a.enable();if(responseArray.code=="0"){if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(typeof responseArray.json.error!="undefined"){$("overlayContactLogin").style.display="block";$("overlayLoadingContact").style.display="none";$("contactLoginErr").innerHTML=responseArray.json.error;$("usr_box").focus()}else{_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/OpenInviterEmailImportComplete"]);if($("overlayLoadingContact").style.display=="block"){$("contactform").reset();$("FoundNum").innerHTML=responseArray.json.found_num;$("overlayLoadingContact").style.display="none";$("overlayContactFound").style.display="block"}$("ListContacts").innerHTML=responseArray.html;CheckAll(document.contactform.mlist)}}}else{if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{displayFeedback(responseArray.code+responseArray.json.error)}}window.clearInterval(lddd)}function getUserInfo(param){new Ajax.Request(URL_GET_USER_CONTACT,{method:"post",parameters:param,onSuccess:function(transport){var response=transport.responseText;parseResponse(response);if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(responseArray.code!="0"){displayFeedback(responseArray.code+responseArray.json.error)}else{div_id=responseArray.json.div_id;div_ids=div_id.split(",");for(var i=0;i<div_ids.length;i++){$(div_ids[i]).value=eval("responseArray['json']."+div_ids[i])}}}},onFailure:function(){displayFeedback("1Error contacting the server")}})}function selectContacts(){$("overlayContactList").show();$("overlayContactFound").hide()}function selectall(){CheckAll(document.contactform.mlist);add2contact(getSelected(document.contactform))}function add2contact(d){var c=$(inviteContactName).value;$(inviteContactName).value=c+d;if($(inviteContactName).value!=""){var b=$("import_btn").className;if(b.indexOf("_gray")<0){$("import_btn").className=b+"_gray"}var a=$("snd_btn").className;if(a.indexOf("_orange")<0){$("snd_btn").className=a+"_orange"}}$("overlayContactLogin").style.display="block";$("overlayContactList").hide();$("overlayContactFound").hide()}function swapButton(){if($(inviteContactName).value!=""){var b=$("import_btn").className;if(b.indexOf("_gray")<0){$("import_btn").className=b+"_gray"}var a=$("snd_btn").className;if(a.indexOf("_orange")<0){$("snd_btn").className=a+"_orange"}}else{$("import_btn").className="import_btn";$("snd_btn").className="snd_btn"}}function SelectContact(){showContactCancel();$("overlayContactLogin").style.display="none";$("overlayLoadingTextGo").style.display="block";$("overlayLoadingTextOI").style.display="none";$("overlayLoadingTextSnd").style.display="none";$("overlayLoadingContact").style.display="block";lddd=window.setInterval('printDot("LoadingDotDotDot")',300);$("contactProviderHeader").innerHTML="Select the contacts you want to email";new Ajax.Request(URL_ADDRESS_BOOK+"/0",{method:"post",onSuccess:function(b){var a=b.responseText;parseResponse(a);if(typeof responseArray.json.url!="undefined"){window.location=responseArray.json.url}else{if(responseArray.code!="0"){displayFeedback(responseArray.code+responseArray.json.error)}else{$("ListContacts").innerHTML=responseArray.html;CheckAll(document.contactform.mlist);if($("overlayLoadingContact").style.display=="block"){$("overlayLoadingContact").style.display="none";$("overlayContactList").show()}}}window.clearInterval(lddd)},onFailure:function(){window.clearInterval(lddd);displayFeedback("1Error contacting the server")}})}function showContactPreview(){if(validateShareForm()){$("overlayContactLogin").style.display="none";showSharePreview(true)}}function checkKeySubmit(a,b){var c="";if(b.which){c=b.which}else{c=b.keyCode}if(c==13){$(a).submit()}}function validateShareForm(){$("errMsg").innerHTML="&nbsp;";$("captcha_err").innerHTML="&nbsp;";$("sndr_nm_ttl").style.color="#777";$("sndr_ml_ttl").style.color="#777";$("rcpt_ml_ttl").style.color="#777";if($("sndr_nm_input").value==""){$("errMsg").innerHTML=GT.gettext("Please enter Your Name");$("sndr_nm_ttl").style.color="red";return false}if($("sndr_ml_input").value==""){$("errMsg").innerHTML=GT.gettext("Please enter Your Email");$("sndr_ml_ttl").style.color="red";return false}if($("rcpt_ml_area").value==""){$("errMsg").innerHTML=GT.gettext("Please enter Your Friend Emails");$("rcpt_ml_ttl").style.color="red";return false}return true}function sendShare(){if(validateShareForm()){var a=URL_SEND_SHARE;if(call_src==""){_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/sendShareEmail"]);$("sndr_sub").innerHTML="Cool animation from ";$("sndr_nm_text2").innerHTML=$("sndr_nm_input").value;$("cntnt_subject").value=$("sndr_sub").innerHTML+$("sndr_nm_text2").innerHTML}else{if(call_src=="faf"||call_src=="invite"){a=URL_SEND_INVITE;_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/findFriends/sendShareEmail"]);$("sndr_sub").innerHTML="Cool site from ";$("sndr_nm_text2").innerHTML=$("sndr_nm_input").value;$("cntnt_subject").value=$("sndr_sub").innerHTML+$("sndr_nm_text2").innerHTML}}$("overlayContactLogin").style.display="none";$("overlayLoadingTextGo").style.display="none";$("overlayLoadingTextOI").style.display="none";$("overlaySharePreview").style.display="none";if($("overlayLoadingCaptcha").style.display!="block"){$("overlayLoadingTextSnd").style.display="block"}$("overlayLoadingContact").style.display="block";lddd=window.setInterval('printDot("LoadingDotDotDot")',300);new Ajax.Request(a,{method:"post",parameters:$("nvtfrm").serialize(),onSuccess:function(c){var b=c.responseText;window.clearInterval(lddd);sendShareComplete(b)},onFailure:function(){window.clearInterval(lddd);displayFeedback("1Error contacting the server");$("nvtfrm").enable();showContactOverlay(false)}});$("nvtfrm").disable()}}function sendShareComplete(a){if(call_src==""){_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/sendShareEmailComplete"]);logSendShareToGA()}else{if(call_src=="faf"){_gaq.push(["_trackPageview","/pageTracker/ajax/overlay/findFriends/sendShareEmailComplete"])}}parseResponse(a);$("nvtfrm").enable();$("overlayLoadingCaptcha").style.display="none";switch(responseArray.code){case"0":if($("overlayLoadingContact").style.display=="block"){$("new_contact").innerHTML=responseArray.json.contact_add_num;$("overlayShareComplete").style.display="block";$("overlayLoadingTextSnd").style.display="none";$("overlayLoadingContact").style.display="none";if($("action_content")!="undefined"){$("action_content").innerHTML="You will appear here once views are generated from your sharing."}}if(call_src=="faf"){jQuery("#foundPageNote,#foundPageInviteBtn,#foundPageFrankie").hide();jQuery("#foundPageThankNote,#foundPageThankFrankie").show();showContactOverlay(false);if($("fanPage").style.display=="block"){jQuery("#fanPage").hide("slide",{direction:"right"},500);jQuery("#foundPage").show("slide",{direction:"left"},500)}else{jQuery("#waitingPage,#loginPage,#fanPage,#manualPage").hide();jQuery("#foundPage").show()}}break;case"1":if($("overlayLoadingContact").style.display=="block"){$("emailshare_captcha_type").setAttribute("value","image");$("emailshare_captcha_id").setAttribute("value",responseArray.json.session_id);$("emailshare_captcha_image").setAttribute("src",responseArray.json.url);$("emailshare_comment_captcha").style.display="block";$("emailshare_image_captcha").style.display="block";$("emailshare_audio_captcha").style.display="none";$("overlayCaptcha").style.display="block";$("contactLoginForm").style.display="none";$("contactShareForm").style.display="none";$("overlayLoadingContact").style.display="none";$("overlayContactLogin").style.display="block"}break;case"2":if($("overlayLoadingContact").style.display=="block"){$("emailshare_captcha_type").setAttribute("value","audio");$("emailshare_captcha_id").setAttribute("value",responseArray.json.session_id);$("emailshare_captcha_audio").innerHTML=getAudioEmbedString(responseArray.json.url);$("emailshare_comment_captcha").style.display="block";$("emailshare_image_captcha").style.display="none";$("emailshare_audio_captcha").style.display="block";$("overlayCaptcha").style.display="block";$("contactLoginForm").style.display="none";$("contactShareForm").style.display="none";$("overlayLoadingContact").style.display="none";$("overlayContactLogin").style.display="block"}break;case"3":$("overlayCaptcha").style.display="block";$("contactLoginForm").style.display="none";$("contactShareForm").style.display="none";$("overlayLoadingContact").style.display="none";$("overlayContactLogin").style.display="block";$("captcha_err").innerHTML=responseArray.json.error;break;default:showContactOverlay(false);displayFeedback(responseArray.code+responseArray.json.error);break}window.clearInterval(lddd);resetResponse()};
