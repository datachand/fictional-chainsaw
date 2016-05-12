var DomainStore = (function () {

	function DomainStore () {
		this.root = {};
	}

	DomainStore.prototype.insert = function (value) {
		var current = this.root;

		for (var index = 0; index < value.length; index++) {
			if (!(value[index] in current)) {
				current[value[index]] = {};
			}
			current = current[value[index]];
		} 
		current.end = true;
	};


	DomainStore.prototype.find = function (value) {
		var current = this.root;
		var i = 0;

		if (!this.isEmpty(current)) {
			while(i !== value.length) {
				var first = value.charAt(i);

				if (first in current) {
					current = current[first];
					if (current.end) {
						return true;
					} 
					i++;
				}
			}
		}

		return false;
	}

	DomainStore.prototype.extract = function (value) {
		// /[^.\s\/]+\.([a-z]{3,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/g
		var expression = new RegExp(/\.([a-z]{3,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/, 'g');
		var match = value.split(expression);
		// match.pop(); // Removes the residue index from Regex split
		if (this.find(match[1])) {
			console.log("Found");
		}
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