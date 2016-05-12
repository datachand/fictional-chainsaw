(function () {

	document.addEventListener("DOMContentLoaded", function () {
		// document.querySelector('domain-search').innerHTML = "Domain Search";
		var store = new DomainStore();
		
		var domain = document.querySelector("[name='domain']");
		var summary = document.querySelector("domain-summary");
		summary.style.display = "none";

		domain.addEventListener("keydown", DomainText, false);

		function DomainText (event) {
			var keyCode = event.keyCode;
			if (keyCode === 13) {
				printSummary(getBaseDomain(this.value));
			}
		}

		function getBaseDomain (input) {
			return store.extract(input);
		}

		function printSummary (input) {
			summary.innerHTML = input;
			summary.style.display = "block";
		}

	}, true);

})();