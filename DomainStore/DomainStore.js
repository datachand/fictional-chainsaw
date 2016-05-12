var DomainStore = (function () {

	function DomainStore () {
		this.root = {};
		this.END_PARAMETER = "$";
	}

	DomainStore.prototype.insert = function (value) {
		var content = value + this.END_PARAMETER;
		var contentLength = value.length;

		for (var phase = 0; phase <= (contentLength); phase++) {
			for (var j = 0; j <= phase+1; j++) {
				this.find(content, j, phase);
			}
		}
	};


	DomainStore.prototype.find = function (value, j, phase) {
		var current = "";
		for (var i = j; i <= phase; i++) {
			current += (value[i]);
		}

		console.log(current);
	}

	DomainStore.prototype.extend = function () {

	}

	DomainStore.prototype.extract = function (value) {
		// /[^.\s\/]+\.([a-z]{3,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/g
		var expression = new RegExp(/\.([a-z]{3,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/, 'g');
		var match = value.split(expression);
		// match.pop(); // Removes the residue index from Regex split
		
		this.insert(match[1]);
		var lobby = match[0].split(".");
		var lobbyLength = lobby.length;
		var domainvalue = lobby[lobbyLength - 1] + "." + match[1];
		return domainvalue;

	}


	DomainStore.prototype.isEmpty = function (obj) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;

		// null and undefined are "empty"
		if (obj == null) return true;

		// Assume if it has a length property with a non-zero value
		// that that property is correct.
		if (obj.length > 0)    return false;
		if (obj.length === 0)  return true;

		// Otherwise, does it have any properties of its own?
		// Note that this doesn't handle
		// toString and valueOf enumeration bugs in IE < 9
		for (var key in obj) {
		    if (hasOwnProperty.call(obj, key)) return false;
		}

		return true;
	}

	return DomainStore;

})();