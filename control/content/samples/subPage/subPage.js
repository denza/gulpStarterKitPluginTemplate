
class subPage{
	constructor(id){
		this.container = document.getElement(id);
		if(!this.container)throw "Sub Page ID not found";
		if(!this.container.classList.contains("subPage"))throw "Sub Page doesnt have class [subPage]";

	}

	show(){
		this.container.classList.add("activeFull");
	}

	showDialog(){
		this.container.classList.add("activeDialog");
	}

	close(){
		this.container.classList.remove("activeFull");
		this.container.classList.remove("activeDialog");
	}
}