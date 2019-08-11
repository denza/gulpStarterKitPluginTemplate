const sortableListUI= {
	sortableList:null
	,contrainer:null
	,data:null
	/*
		This method will call the datastore to pull a single object
		it needs to have an array property called `items` each item need {title, imgUrl}
	 */
	,init(elementId,tag="content") {
		this.tag=tag;
		this.contrainer = document.getElementById(elementId);
		this.contrainer.innerHTML="loading...";
		buildfire.datastore.get(this.tag, (e, obj) => {
			if (e) {
				console.error(e);
				this.contrainer.innerHTML="An error has occurred. Please contact your system admin.";
			}
			else if (obj && obj.data) {
				this.data = obj.data;
				if(!obj.data.items || obj.data.items.length == 0)
					this.contrainer.innerHTML="No items have been added yet.";
				else {
					this.contrainer.innerHTML="";
					sortableListUI.render(obj.data.items);
				}
			}
		});
	}



	, render(items) {
		let t = this;
		this.sortableList = new buildfire.components.SortableList(this.contrainer, items || []);

		this.sortableList.onItemClick = (item) => {
			buildfire.notifications.alert({message: item.title + " clicked"});
		};
		this.sortableList.onDeleteItem = (item, index, callback) => {
			buildfire.notifications.confirm({
					message: "Are you sure you want to delete " + item.title + "?"
					, confirmButton: {text: 'Delete', key: 'y', type: 'danger'}
					, cancelButton: {text: 'Cancel', key: 'n', type: 'default'}
				}, function (e, data) {
					if (e) console.error(e);
					if (data.selectedButton.key == "y") {
						let itemDeleted= t.data.items.splice(index,1);
						t.sortableList.loadItems(t.data.items,false);
						buildfire.datastore.save({$set:{items:t.data.items}},t.tag,e=>{
							callback(e,itemDeleted);
						});

					}
				}
			);
		};

		this.sortableList.onOrderChange=(item, oldIndex, newIndex)=>{

			let temp = this.data.items.splice(oldIndex,1)[0];
			this.data.items.splice(newIndex,0,temp);
			buildfire.datastore.save({$set:{items:this.data.items}},this.tag,()=>{});
		}
	}
};