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

		var lobby = match[0].split(".");
		var lobbyLength = lobby.length;

		if(!this.findNodeBySuffix(match[1])) { 
			var domainvalue = {};
			var court = match[1].split(".");
			if (court.length === 2) { 
				var checkExistenceOneTLD = this.findNodeBySuffix(court[court.length - 1]);
				var existenceTLD = court[court.length - 1];

				if (checkExistenceOneTLD) {
					domainvalue = {"hold": true, "eo": true, "extn": existenceTLD, "extnT": match[1], "domain": {}};
					
				} else {
					domainvalue = {"hold": true, "eo": false, "extn": existenceTLD, "extnT": match[1], "domain": {}};
				}

				domainvalue.domain[existenceTLD] = match[1];
				domainvalue.domain[match[1]] = lobby[lobbyLength - 1] + "." + match[1];
			} else {
				this.insert(match[1]);		
				domainvalue = {"hold": false, "domain": lobby[lobbyLength - 1] + "." + match[1]};
			}

		} else {
			domainvalue = {"hold": false, "domain": lobby[lobbyLength - 1] + "." + match[1]};			
		}

		return domainvalue;

	}

	return DomainStore;

})();