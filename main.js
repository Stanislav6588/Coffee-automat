'use strict'

class Coffee{
	constructor({listUl, cup, inner}) {
		this.listUl = document.querySelector(listUl);
		this.cup = document.querySelector(cup);
		this.inner = document.querySelector(inner);
		this.url = '/recept.json';
	}

	sendpost(){
		fetch(this.url, {
			method: 'GET',
			mode: 'cors',
			// cache: 'cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify()
		})
			.then((response) => {
				if(response.status !== 200){
					throw new Error('is not 200');
				}
					return response.json();
			})
			.then((data) => {
				 this.open(data);
			})
			.catch((error) => console.error(error));
	}

	open(data){
		let arr = [];
		data.forEach((i) => {
			if(i.recipe){
				arr.push(i)
			}
		})
		this.createList(arr);
		this.createCup(arr);
	}

	createList(arr){
	arr.forEach((i) => {
		this.listUl.insertAdjacentHTML('beforeend', `
		<li>${i.title_ua}</li>
		`)
	})
	}

	createCup(arr){
		this.listUl.addEventListener('click', (el) => {
			this.defaultSettings();
			let t = el.target;
			t.classList.add('active')
			arr.forEach((i) => {
				if(t.textContent == i.title_ua){
					console.dir(i);
					let background = 395 ;
					i.recipe.forEach((el) => {
						let size = +el.volume * 78;
						let volume = +el.volume * 100;
						background -= size;
						this.layerCup(el.class_name, size, el.name, volume);
					})
					let d = 'background';
					this.layerCup(d, background);
				}
			})
		})

	}

	layerCup(name, size, elem, volume){
		this.inner.insertAdjacentHTML('beforeend', `
			<div class="${name}"style="height:${size}px">${elem} ${volume}г</div>
		`)
	}

	defaultSettings(){
		document.querySelectorAll('li').forEach((i) => {
			i.classList.remove('active');
		})
		 document.querySelector('.inner').innerHTML = '';
	}

	init(){
		this.sendpost();
		// this.open();
	}
}