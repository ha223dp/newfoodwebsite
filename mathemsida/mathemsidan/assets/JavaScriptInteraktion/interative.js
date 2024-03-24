function confirmCookies() {
    // OM kakor redan finns
    if (localStorage.getItem('cookiesConfirmed')) {
      console.log('Cookies have already been confirmed.');
      return;
    }
 // Meddelandet om kakorna
    var confirmationMessage = 'Den här hemsidan använder sig av cookies för att förbättra din upplevelse. Genom att använda den här hemsidan, samtycker du användet av cookies.';
  
    //Om kakorna har blivit godkända eller inte.
    if (confirm(confirmationMessage)) {
      localStorage.setItem('cookiesConfirmed', true);
      console.log('Cookies confirmed by the user.');
    } else {
      console.log('Cookies not confirmed by the user.');
    }
  }
  

  confirmCookies();
  