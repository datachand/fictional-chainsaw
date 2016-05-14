(function () {

	document.addEventListener("DOMContentLoaded", function () {
		// document.querySelector('domain-search').innerHTML = "Domain Search";
		var store = new DomainStore();

		var globalBaseDomain = {};
		
		var domain = document.querySelector("[name='domain']");
		var summary = document.querySelector("domain-summary");
		var status = document.querySelector("status-bar");
		var statusOne = document.querySelector("#statusOne");
		var statusTwo = document.querySelector("#statusTwo");
		var sotldOne = document.querySelector('.sotldOne');
		var sotldTwo = document.querySelector(".sotldTwo");
		var sttldOne = document.querySelector('.sttldOne');
		var sttldTwo = document.querySelector(".sttldTwo");
		var statusHolder = document.querySelectorAll(".status-holder");
		var storeRootHolder = document.querySelector(".storeRootPrint");

		summary.style.display = "none";
		status.style.display = "none";
		statusOne.style.display = "none";
		statusTwo.style.display = "none";
		statusThree.style.display = "none";


		domain.addEventListener("keydown", DomainText, false);

		sotldOne.addEventListener("click", SelectionInsert, false);

		sotldTwo.addEventListener("click", SelectionInsert, false);

		sttldOne.addEventListener("click", SelectionInsert, false);

		sttldTwo.addEventListener("click", SelectionInsert, false);

		storeRootHolder.addEventListener("click", printStoreRootInConsole, false);

		function DomainText (event) {
			status.style.display = "none";
			summary.style.display = "none";

			var keyCode = event.keyCode;

			if (keyCode === 13) {
				var baseDomain = getBaseDomain(this.value);

				if (baseDomain.hold) {
					displaySuffixSelector(baseDomain)
				} else {
					printSummary(baseDomain.domain);
				}
				
			}
		}

		function getBaseDomain (input) {
			return store.extract(input);
		}

		function printSummary (input) {
			hideStatusHolder();
			summary.innerHTML = input;
			summary.style.display = "block";
			statusThree.style.display = "block";
			status.style.display = "block";
		}

		function displaySuffixSelector (baseDomain) {
			hideStatusHolder();
			var tldOneText = (baseDomain.extn);
			var tldTwoText = (baseDomain.extnT);
			
			if (baseDomain.eo) {
				statusOne.style.display = "block";
				sotldOne.innerHTML = (tldOneText);
				sotldTwo.innerHTML = (tldTwoText);
			} else {
				statusTwo.style.display = "block";
				sttldOne.innerHTML = (tldOneText);
				sttldTwo.innerHTML = (tldTwoText);
			}

			globalBaseDomain = baseDomain;
			status.style.display = "block";
		}

		function SelectionInsert () {
			var content = (this.textContent || this.innerText);
			if (!store.findNodeBySuffix(content)) {
 				store.insert(content);
 			}

 			printSummary(globalBaseDomain.domain[content]);
		}

		function hideStatusHolder () {
			for (var sh = 0; sh < statusHolder.length; sh++) {
				statusHolder[sh].style.display = "none";			
			}
		}

		function printStoreRootInConsole () {
			console.clear();
			console.log("%c %c %c Root | DomainStore %c %c %c http://chandreshrm.name", "background: #f2f2f2","background: #dddddd","color: #222222; background: #cccccc;","background: #dddddd","background: #f2f2f2","background: #ffffff");
			console.log(store.root);
		}

	}, true);

})();