const tableBody = document.querySelector('#modelTable tbody');
const tableFoot = document.querySelector('#modelTable tfoot');
const table = document.querySelector('#modelTable');
const apiform = document.querySelector('#APIform');
const inputapi = document.getElementById('apiKey');
let apikey = '';

document.addEventListener('DOMContentLoaded', async function() {
	try {
		showModels();
	} catch (error) {
			console.error(error);
	}
});

apiform.addEventListener('submit', e=>{
	e.preventDefault();
	apikey = inputapi.value;
	console.log(apikey);
});

async function showModels(){
	try{
		fetch('/db/models/')
		.then(response => response.json())
		.then((models) => {
			if(models.length != 0){
				for(i = 0; i < models.length; i++){
					const row = document.createElement('tr');
					row.id = models[i]._id;
					row.innerHTML = `<td>${models[i].Mname}</td>`;
					row.innerHTML += `<td><button class = "viewbutton" id = "${models[i]._id}">Посмотреть</button></td>`;
					row.innerHTML += `<td><button class = "deletebutton" id = "${models[i]._id}">Удалить</button></td>`;
					tableBody.appendChild(row);
				}
			}else{
				const row = document.createElement('tr');
				row.innerHTML = `<td>Моделей не найдено</td>`;
				tableBody.appendChild(row);
			}
		})

	}catch(err){
		console.log(err);
    alert('Что-то пошло не так');
	}
};

table.addEventListener('click', async function(event) {
	let target = event.target;

	if (target.className =='viewbutton'){
		try{
			fetch(`/db/models/${target.id}`)
			.then(response => response.json())
			.then((model) => {
				
				if(document.querySelector('#more')){
					let more = document.querySelector('#more');
					let moren = document.querySelector('#moren');
					more.remove();
					moren.remove();
				}

				const form = document.createElement('form');
				form.id = 'more';
				const name = document.createElement('h2');
				name.id = 'moren'

				name.innerHTML = `Данные о модели: ${model.Mname}`;
				table.after(name);

				form.innerHTML = `
				<label for="Uname">User name:</label>
				<input type="text" readonly placeholder="User name" id="username" name="username" value = "${model.Uname}">
	
				<label for="Mname">Model name:</label>
				<input type="text" readonly placeholder="Model name" id="modelname" name="modelname" value = "${model.Mname}">

				<label for="Mtype">Model type:</label>
				<input type="text" readonly placeholder="Model type" id="modeltype" name="modeltype" value = "${model.Mtype}">

				<label for="Object">Object:</label>
				<input type="textarea" readonly  placeholder="Object" id="object" name="object" value = "${model.Object}">

				<label for="Owerview">Owerview:</label>
				<input type="textarea" readonly placeholder="Owerview" id="owerview" name="owerview" value = "${model.Owerview}">

				<label for="Comment">Comment:</label>
				<input type="textarea" readonly placeholder="User comment" id="comment" name="comment" value = "${model.Comment}">
				
				<label for="Createdata">Date of creation:</label>
				<input type="data" readonly placeholder="User comment" id="comment" name="comment" value = "${model.Createdata}">
				
				<label for="Updatedata">Date of creation:</label>
				<input type="data" readonly placeholder="User comment" id="comment" name="comment" value = "${model.Updatedata}">`;
				name.after(form);
			})

		}catch(err){
			console.log(err.message);
      alert('Что-то пошло не так');
		}

	} else if (target.className =='deletebutton'){
			if(apikey != ""){

				try{
					fetch(`/db/models/${target.id}?apiKey=${apikey}`, {
						method: 'DELETE',
						headers: {'Content-Type': 'application/json'},
					})
					.then((result)=>{
						if(result.status == '400'){
							alert('Что-то пошло не так, проверьте ваш apikey');
						}else{
							tableBody.innerHTML = '';
					    setTimeout(showModels, 100);
						}
					})

				}catch(err){
					console.log(err);
					alert('Что-то пошло не так, проверьте ваш apikey');
				}
				
			}else alert("Введите ваш apikey");

	} else if (target.className =='updatebutton'){
		tableBody.innerHTML = '';
		showModels();
	}
});