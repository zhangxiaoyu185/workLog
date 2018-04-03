var config = {};

config.api = [ 
];

var _attachId = function(api) {
	for (var i = 0; i < api.length; i++) {
		var mid = "m" + i;
		api[i].id = mid;
		var pd = api[i].payload;
		for (var j = 0; j < pd.length; j++) {
			var aid = "i" + j;
			pd[j].id = mid + aid;

		}
	}

};
_attachId(config.api);

if ( typeof module === "object" && module && typeof module.exports === "object" ) {	
	module.exports = config.api;
}