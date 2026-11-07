(function(){
  const form=document.getElementById('business-inquiry-form');
  if(!form)return;
  const status=document.getElementById('form-status');
  const whatsapp=document.getElementById('whatsapp-inquiry');
  const recipient='mubeen@mubeenfarooq.online';
  function makeMessage(){
    const data=new FormData(form);
    const fields=[['Full name','Full Name'],['Company','Company'],['Business email','email'],['Company website','Company Website'],['Industry / service category','Industry'],['Support needed','Support Needed'],['Target states or regions','Target States'],['Business goals','Business Goals']];
    return fields.map(([label,key])=>label+': '+((data.get(key)||'Not provided').toString().trim()||'Not provided')).join('\\n');
  }
  function valid(){
    if(!form.reportValidity())return false;
    if(status)status.textContent='Your inquiry is ready. Review the message in your email or WhatsApp app and press Send.';
    return true;
  }
  form.addEventListener('submit',function(event){
    event.preventDefault();
    if(!valid())return;
    const subject='New Research Ops Business Inquiry';
    const body=makeMessage();
    const mailto='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    window.location.href=mailto;
  });
  whatsapp.addEventListener('click',function(){
    if(!valid())return;
    const message='Hello Research Ops, I would like to discuss business development support.\\n\\n'+makeMessage();
    window.open('https://wa.me/923299844137?text='+encodeURIComponent(message),'_blank','noopener');
  });
})();
