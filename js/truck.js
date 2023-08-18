// operations
function get_supp_list() {
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "supp_list"
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var supp_dd = document.getElementById("supp");
	ws.addEventListener("message", function(e) {
		var supp_list = JSON.parse(e.data);
		for (let supp of supp_list) {
			supp_dd.innerHTML += "<option value=\"" + supp + "\">" + supp + "</option>";
		}
	});
};

function get_model_list() {
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "car-model_list"
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var model_dd = document.getElementById("car-model");
	ws.addEventListener("message", function(e) {
		var model_list = JSON.parse(e.data);
		for (let model of model_list) {
			model_dd.innerHTML += "<option value=\"" + model + "\">" + model + "</option>";
		}
	});
};

function get_truck_list() {
	var supp_slct = document.getElementById("supp");
	var supp_choice = supp_slct.options[supp_slct.selectedIndex].value;
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "truck_list",
				"value": {
					"supplier": supp_choice
				}
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var truck_dd = document.getElementById("truck");
	truck_dd.innerHTML = "<option value=\"\" selected disabled>--请选择装载板车--</option>";
	ws.addEventListener("message", function(e) {
		var truck_list = JSON.parse(e.data);
		for (let truck of truck_list) {
			truck_dd.innerHTML += "<option value=\"" + truck + "\">" + truck + "</option>";
		}
	});
};

function get_truck_info() {
	var supp_slct = document.getElementById("supp");
	var supp_choice = supp_slct.options[supp_slct.selectedIndex].value;
	var truck_slct = document.getElementById("truck");
	var truck_choice = truck_slct.options[truck_slct.selectedIndex].value;
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "truck_info",
				"value": {
					"supplier": supp_choice,
					"truck": truck_choice
				}
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var truck_p = document.getElementById("truck_photo");
	ws.addEventListener("message", function(e) {
		var truck_info = JSON.parse(e.data);
		truck_p.src = truck_info.image;
	});
};

function get_version_list() {
	var model_slct = document.getElementById("car-model");
	var model_choice = model_slct.options[model_slct.selectedIndex].value;
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "car-version_list",
				"value": {
					"model": model_choice
				}
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var version_dd = document.getElementById("car-version");
	version_dd.innerHTML = "<option value=\"\" selected disabled>--请选择版本--</option>";
	ws.addEventListener("message", function(e) {
		var version_list = JSON.parse(e.data);
		for (let version of version_list) {
			version_dd.innerHTML += "<option value=\"" + version + "\">" + version + "</option>";
		}
	});
};

function get_car_info() {
	var model_slct = document.getElementById("car-model");
	var model_choice = model_slct.options[model_slct.selectedIndex].value;
	var version_slct = document.getElementById("car-version");
	var version_choice = version_slct.options[version_slct.selectedIndex].value;
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "car_info",
				"value": {
					"model": model_choice,
					"version": version_choice
				}
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var car_p = document.getElementById("car_photo");
	ws.addEventListener("message", function(e) {
		var car_info = JSON.parse(e.data);
		car_p.src = car_info.image;
	});
};

// startup
get_supp_list();
get_model_list();