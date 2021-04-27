  var arrRandom, arrUser, arrResult;
  var limit = 5;
  var secAttesa = 2;

  $(function(){

    // inizializzo l'app
    reset();

    // 1 inizio a giocare
    $('#start').click(function(){
      //faccio generare l'arrRandom
      while(arrRandom.length < limit){
        var nr = getNumberGenerator(1,100);
        // se il numero non è presento lo inserisco nell'array
        if(!arrRandom.includes(nr)) arrRandom.push(nr);
      }

      // visualizzo il gioco da fare e tolgo il bottone start
      printDisplay('I numeri estratti sono: '+arrRandom.join(' - '));
      $('#start').hide();

      //termino la visulaizzazione dopo i secondi e iniza il gioco
      setTimeout(function(){
        printDisplay('Inserisci '+ limit + ' numeri.');
        $('#console').show();
      }, secAttesa * 1000);
    });

    // 2 inserisco i numeri
    $('#send-number').click(function(){

      // se non ho ancora inserito tutti i numeri vado avanti
      if(arrUser.length < limit) {
        // impedisco i numeri doppi e ti avverto
        if(arrUser.includes($('input').val())) {
          printDisplay('Attenzione numero già inserito');
        }else{
          // inserimento corretto con output
          arrUser.push($('input').val());
          printDisplay('Numeri inseriti: '+arrUser.join(' - '));
        }
      }
      if(arrUser.length  === limit){
        // verifico il  punteggio
          for(var num of arrUser){
            
            //console.log(typeof(num)) // controllo il tipo 
            if(arrRandom.includes(parseInt(num))){
              arrResult.push(num);
            }
            
          }
          console.log(arrResult);
        // quando ho inserito tutti i numeri aspetto un secondo e mostro attesa...
        
        // per mostrare anche l'ultimo numero inserto aspetto mezzo secondo a scrive Calcolo in corso..
        setTimeout(function(){

          printDisplay('Calcolo in corso...');
          $('#console').hide();

        }, 500);

        // dopo 2 secondi da calcolo in corso mostro il risultato
        setTimeout(function(){

          if(arrResult.length === 0){
            printDisplay('Hai perso!')
          }else if(arrResult.length === limit){
            printDisplay('Hai vinto');
          }else{
            printDisplay('Hai indovinato questi numeri: '+arrResult.join(' - '));
          }
          $('#restart').show();
          
        }, 2500);
        
      }
      $('input').val('');
      $('input').focus();
      

    });

    // cliccando su reset inizializzo l'app
    $('#restart').click(function(){
      reset();
    });

  });

  // creao una funzione di reset per poter gestire sempre il punto di partenza
  // azzero tutti i dati e visualizzo la situazione di inizio
  function reset(){
    limit = parseInt(prompt('Scegli quanti numeri inserire'));
    arrRandom = [];
    arrUser = [];
    arrResult = [];
    printDisplay('Per iniziare a giocare clicca su VIA');
    $('#display').show();
    $('#start').show();
    $('#restart').hide();
    $('#console').hide();
  }

  // stampa un testo nel display
  function printDisplay(text){
    $('#display').text(text);
  }

  //generatore di numeri random
  function getNumberGenerator(min,max){
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }