
if (typeof (buildfire) == "undefined") throw ("please add buildfire.js first to use sortableList components");
if (typeof (buildfire.components) == "undefined") buildfire.components = {};

if (typeof (Sortable) == "undefined")throw ("please add sortable.min.js first to use sortableList components");


buildfire.components.SortableList = class SortableList{

    constructor (element, items=[]) {
        // sortableList requires Sortable.js
        if (typeof (Sortable) == "undefined") throw ("please add Sortable first to use sortableList components");
        this.items = [];
        this.init(element);
        this.loadItems(items);
    }

    // will be called to initialize the setting in the constructor
    init(element) {
        if(typeof(element)=="string")
            this.element = document.getElement(element);
        else
            this.element=element;
        //this._renderTemplate();
        this.element.classList.add("draggable-list-view");
        this._initEvents();
    }

    // this method allows you to replace the slider image or append to then if appendItems = true
    loadItems (items, appendItems) {
        if (items && items instanceof Array) {
            if (!appendItems && this.items.length !== 0) {
                // here we want to remove any existing items since the user of the component don't want to append items
                this._removeAll();
            }

            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i]);
                this._appendItem(items[i]);
            }
        }
    }

    // allows you to append a single item or an array of items
    append (items) {
        if (!items)
            return;
        else if (!(items instanceof Array) && typeof (items) == "object")
            items = [items];

        this.loadItems(items, true);
    }

    // remove all items in list
    clear() {
        this._removeAll();
        this.onDeleteItem();
    }

    // remove all the DOM element and empty the items array
    _removeAll () {
        this.items = [];
        this.element.innerHTML='';
    }

    // append new sortable item to the DOM
    _appendItem (item) {
        var me = this,
            // Create the required DOM elements
            row = document.createElement("div"),
            moveHandle = document.createElement("span"),
            title = document.createElement("a") ,
            deleteButton = document.createElement("span");

        // Add the required classes to the elements
        row.className = "d-item clearfix";
        moveHandle.className = "glyphicon glyphicon-menu-hamburger cursor-grab ";
        title.className = "title ellipsis item-title";

        deleteButton.className = "glyphicon glyphicon-remove ";
        title.innerHTML = item.title;

        // Append elements to the DOM
        row.appendChild(moveHandle);
        if(item.imgUrl){
            let img = document.createElement("img");
            img.src = buildfire.imageLib.cropImage(item.imgUrl,{width:16,height:16});
            row.appendChild(img);
        }
        row.appendChild(title);
        row.appendChild(deleteButton);
        me.element.appendChild(row);


        title.onclick = ()=>{
            this.onItemClick(item);
            return false;
        };

        deleteButton.onclick=()=>{
            this.onDeleteItem(item,null,confirmed=>{
                if(confirmed)row.parentNode.removeChild(row);
            });
            return false;
        };
    }


    // initialize the generic events
    _initEvents() {
        var me = this;
        var oldIndex = 0;

        // initialize the sort on the container of the items
        me.sortableList = Sortable.create(me.element, {
            animation: 150,
            onUpdate: function (evt) {
                var newIndex = me._getSortableItemIndex(evt.item);
                var tmp = me.items[oldIndex];

                if (oldIndex < newIndex) {
                    for (var i = oldIndex + 1; i <= newIndex; i++) {
                        me.items[i - 1] = me.items[i];
                    }
                } else {
                    for (var i = oldIndex - 1; i >= newIndex; i--) {
                        me.items[i + 1] = me.items[i];
                    }
                }

                me.items[newIndex] = tmp;
                me.onOrderChange(tmp, oldIndex, newIndex);
            },
            onStart: function (evt) {
                oldIndex = me._getSortableItemIndex(evt.item);
            }
        });
    }

    // get item index from the DOM sortable elements
    _getSortableItemIndex (item) {
        var index = 0;
        while ((item = item.previousSibling) != null) {
            index++;
        }
        return index;
    }

    _cropImage (url, options) {
        if (!url) {
            return "";
        }
        else {
            return buildfire.imageLib.cropImage(url, options);
        }
    }

    /* This will be triggered when the order of items changes
	  Example: if you move the first item location to be the second this will return item object, 0, 1 */
    onOrderChange(item, oldIndex, newIndex) {
        console.warn("please handle onOrderChange", item, oldIndex, newIndex);
    }

    // This will be triggered when you delete an item
    onDeleteItem (item, index) {
        console.error("please handle onDeleteItem", item);
    }

    // This will be triggered when you delete an item
    onItemClick (item, index) {
        console.error("please handle onItemClick", item);
    }
};