const sortableListUI= {
	sortableList:null
	,contrainer:null
	,init(elementId) {
		this.contrainer = document.getElementById(elementId);
		this.contrainer.innerHTML="loading...";
		buildfire.datastore.get("content", (e, obj) => {

			if (e) {
				console.error(e);
				this.contrainer.innerHTML="An error has occurred. Please contact your system admin.";
			}
			else if (obj && obj.data) {
				if(!obj.data.items || obj.data.items.length == 0)
					this.contrainer.innerHTML="No items have been added yet.";
				sortableListUI.render(obj.data.items);
			}
		});
	}



	, render(items) {
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
						//delete
						callback(true);
					}
				}
			);
		};
	}
};