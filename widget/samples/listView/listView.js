

class ListView{
	constructor(containerId,options){
		this.container = document.getElementById(containerId);
		if(!this.container) throw "Cant find container";
		this.container.classList.add("listViewContainer");
		this.options=options || {};
		this.container.innerHTML="";
	}

	clear(){
		this.container.innerHTML="";
	}
	loadListViewItems(items){
		if(this.container.innerHTML==""){
			if(this.options.enableAddButton){
				let addButton = ui.create("div",this.container,"+",["listViewAddButton"]);
				addButton.onclick = this.onAddButtonClicked;
			}
		}
		items.forEach(item=>this.addItem(item));
	}

	addItem(item){
		let t = this;
		if(!(item instanceof ListViewItem) )
			item = new ListViewItem(item);
		item.render(this.container).onclick=()=>{
			t.onItemClicked(item);
		};
	}

	onAddButtonClicked(){
		console.log("Add Button Clicked");
	}

	onItemClicked(item){
		console.log("Item Clicked",item);
	}


}

class ListViewItem{
	constructor(obj={}){
		this.id = obj.id;
		this.title = obj.title;
		this.imageUrl = obj.imageUrl;
		this.description = obj.description;
		this.data = obj.data;
	}


	toRawData(){
		return{
			id: this.id,
			title: this.title,
			imageUrl:this.imageUrl ,
			description:this.description,
			data:this.data
		};
	}

	render(container,card){
		this.container=container;

		if(card)
			card.innerHTML="";
		else
			card = ui.create('div',container,'',['listViewItem']);

		this.card=card;


		if(this.imageUrl) {
			let img = ui.create('img', card, null, ['listViewItemImg']);

			if(this.imageUrl.indexOf("http")==0)
				img.src= buildfire.imageLib.cropImage(this.imageUrl,{width:128,height:128});
			else // local
				img.src= this.imageUrl;
		}

		let textSection= ui.create('div',card,null,['listViewItemTextSection']);

		ui.create('div',textSection,this.title,['listViewItemTitle']);

		if(this.description)
			ui.create('div',textSection,this.description,['listViewItemDescription']);

		return card;
	}

	update(){
		this.render(this.container,this.card);
	}

}