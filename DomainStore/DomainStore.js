var DomainStore = (function () {

	function DomainStore () {
		this.root = {};
		this.END_PARAMETER = "";
	}

	DomainStore.prototype.insert = function (value) {
		var content = value + this.END_PARAMETER;
		var contentLength = value.length;
		var index = "";
		var current = this.root;

		for (var phase = 0; phase <= (contentLength-1); phase++) {
			for (var j = 0; j <= phase+1; j++) {
				this.findAndExtend(content, j, phase);
			}
		}

	};


	DomainStore.prototype.findAndExtend = function (value, j, phase) {
		var current = this.root;
		var index = "";
		for (var i = j; i <= phase; i++) {
			var temp = current[value[i]];

			if (temp) {
				current = temp
			} else {
				current[value[i]] = {};
				current = current[value[i]];
			}
		}

	}

	DomainStore.prototype.findNodeBySuffix = function (suffix) {
		var current = this.root;
		var suffixLength = suffix.length;
		var element;

		for (var i = 0; i < suffixLength; i++) {
			element = current[suffix[i]];
			if (!element) {
				return false;
			}
		}
		return true;
	}

	DomainStore.prototype.extract = function (value) {
		// /[^.\s\/]+\.([a-z]{3,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/g
		var expression = new RegExp(/\.([a-z]{2,}|[a-z]{3}.[a-z]{2}|[a-z]{2}.[a-z]{2})$/, 'g');
		var match = value.split(expression);
		// match.pop(); // Removes the residue index from Regex split
		if(!this.findNodeBySuffix(match[1])) {
			this.insert(match[1]);
		}
		var lobby = match[0].split(".");
		var lobbyLength = lobby.length;
		var domainvalue = lobby[lobbyLength - 1] + "." + match[1];
		console.log(this.root);
		return domainvalue;

	}

	return DomainStore;

})();