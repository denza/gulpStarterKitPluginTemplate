
class subPage{
	constructor(id){
		this.container = document.getElementById(id);
		if(!this.container)throw "Sub Page ID not found";
		if(!this.container.classList.contains("subPage"))throw "Sub Page doesnt have class [subPage]";

		let closeButton = this.container.querySelector(".close-modal");
		if(closeButton)
			closeButton.onclick=()=>{this.container.classList.remove("activeDialog");};

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