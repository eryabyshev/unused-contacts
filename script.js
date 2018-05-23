



	var doc = document,
		start__input = doc.querySelector('.start__input'),
		start__button = doc.querySelector('.start__button'),
		start_labbel_for_input = doc.querySelector('.start_labbel-for-input'),
		contacts,
		contactsArray = [],
		control = doc.querySelector('.control'),
		display = doc.querySelector('.display'),
		display__table = doc.querySelector('.display__table'),
		accept = doc.querySelector('.accept'),
		control__input = doc.querySelector('.control__input'),
		cells = [],
		resultBlock = doc.querySelector('.result'),
		finish = doc.querySelector('.finish'),
		result__table = doc.querySelector('.result__table'),
		result__refresh = doc.querySelector('.result__refresh');





	function connectorInput(){
		start_labbel_for_input.style.color = 'black';

		if(!start__input.value || !(start__input.value / 1) || start__input.value < 0){
			start_labbel_for_input.style.color = 'red';
			start__input.value = "";
			return;
		}

		contacts = start__input.value;

		for(var i = 0; i < contacts; i++){
			contactsArray.push(i + 1);
		}
		
		control.setAttribute('class', 'control show');
		display.setAttribute('class', 'display show');


		var table = buildTable(contacts);

		display__table.innerHTML = table;
		initTableCells();
		addEventListenerForCells();

		start__input.disabled = 1;
		start__button.disabled = 1;


	}

	
	start__button.addEventListener('click', connectorInput);



	function initTableCells(){

		var newDocdStatmen = document;

		for(var i = 0; i < contacts; i++){
			cells[i] = newDocdStatmen.querySelector('#cell' + (i + 1));
		}
	}


	function intervalArray(start, finish) {
		
		var array = [];
		for (;start <= finish; start++){
			array.push(start);
		}
		return array;
	}


	function arrayFromInput(input){

		var array = [];
		if(input.substring('...') && input.split('...').length == 2){
			array = intervalArray(input.split('...')[0], input.split('...')[1]);
			
		}
		else{
			array = input.split(' ');
			for(var i = 0; i < array.length; i++){
				if(!Number(array[i])){
					return false;
				}
			}
		}
		
		return array;
	}



	function addContact (){

		control.style.borderColor = 'silver';
		
		var input = arrayFromInput(control__input.value);
		if(!input){
			control.style.borderColor = "red";
			control__input.value = '';
			return;
		}
		for(var i = 0; i < input.length; i++){
			useContact(input[i]);
		}
		control__input.value = '';
	}


	accept.addEventListener('click', addContact);



	function itBusy(contact){
		if(contactsArray[contact - 1] === 0){
			return true;
		}
		return false;
	}


	function useContact(contact){

		if(Number(contact) > Number(contacts) || Number(contact) <= 0){
			alert("Ошибка ввода! В соединителе нет контакта №" + contact +" !!!");
			return;
		}
		else if(itBusy(contact)){
			alert("Контакт №" + contact + " уже использован!");
			return;
		}
		contactsArray[contact - 1] = 0;
		cells[contact - 1].setAttribute('class', 'busy');
	}



	function buildTable(contacts){
		var block = "<tr>";
		for(var i = 0; i < contacts; i++){

			if(i % 10 === 0){
				block += "</tr>\n<tr>"
			}
			block += "<th id = 'cell" + (i + 1) +"' class = 'cell'>" + (i + 1) +"</th>";
		}
		block += "</tr>";
		return block;
	}



	function pressCell(event){
		var target = event.target;
		if(target.getAttribute('class') === 'cell'){
			useContact(target.innerHTML);
		}
		else if(target.getAttribute('class') === 'busy'){
			contactsArray[target.innerHTML - 1] = Number(target.innerHTML);
			target.setAttribute('class', 'cell');
		}
	}



	function addEventListenerForCells(){

		var cells = document.querySelectorAll('.cell');

		for(var i = 0; i < cells.length; i++){
			cells[i].addEventListener('click', pressCell);
		}
	}


	function removeEventListenerForCells(){
		var cells = document.querySelectorAll('.cell');

		for(var i = 0; i < cells.length; i++){
			cells[i].removeEventListener('click', pressCell);
		}
	}




	finish.addEventListener('click', function(){

		resultBlock.setAttribute('class', 'display show');
		var result = '';

		for(var i = 0; i < contacts; i++){

			if(contactsArray[i] === 0){
				continue;
			}
			else if(i === contactsArray.length - 1){
				result += contactsArray[i];
			}
			else if(contactsArray[i + 1] > 0 
				&& contactsArray[i + 2] > 0 
				&& i + 1 < contacts 
				&& i + 2 <= contacts){

				result = result + contactsArray[i];
                for (; contactsArray[i] != 0 && i < contacts - 1; i++ ){
                             
                }
                i--;
                result = result + "..." + contactsArray[i] + ", ";
			}
			else{
                 result = result + contactsArray[i] + ", ";
            }
		}

		if(result[result.length - 2] === ','){
			result = result.substring(0, result.length - 2);
		}

		result__table.value = result;
		removeEventListenerForCells();
		control.setAttribute('class', 'hide');
	})


	result__refresh.addEventListener('click', function(){
		window.location.reload();
	})



	document.addEventListener('keydown', function(event){
		if(event.code === 'Enter' && document.activeElement.getAttribute('class') === 'start__input'){
			connectorInput();
		}
		else if((event.code === 'Enter' 
			|| event.code === 'NumpadEnter')
			&& document.activeElement.getAttribute('class') === 'control__input'){
			addContact();
		}

	})



//1,25,2,24,3,26,4,27,5,28,6,29,7,30,8,31,12,22,10,13,23,11,32,19,20












