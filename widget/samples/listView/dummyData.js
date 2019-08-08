
let dummyData=[
	{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
	}
	,{
		title:"Title 1"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
		,description:"Blah blah blah"
	}
	,{
		title:"Title 2 really longTitle 2 really longTitle 2 really long"
		,imageUrl:"https://img.icons8.com/ios/72/worldwide-location.png"
	}
	,{
		title:"Title 3"
	}
];

(function() {
	let item = new ListViewItem({
		title: "Title 2 really longTitle 2 really longTitle 2 really long"
		, imageUrl: "https://img.icons8.com/ios/72/worldwide-location.png"
	});
	dummyData.push(item);
})();