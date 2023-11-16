// operations
function get_brand_list() {
	var ws = new WebSocket("ws://175.102.11.202:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "brand_list"
			}
		};
		ws.send(JSON.stringify(request) + "\n");
	});
	var brand_dd = document.getElementById("brand");
	ws.addEventListener("message", function(e) {
		var brand_list = JSON.parse(e.data);
		for (let brand of brand_list) {
			brand_dd.innerHTML += "<option value=\"" + brand + "\">" + brand + "</option>";
		}
	});
};

function get_model_list() {
	var brand_slct = document.getElementById("brand");
	var brand_choice = brand_slct.options[brand_slct.selectedIndex].value;
	var ws = new WebSocket("ws://175.102.11.202:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "model_list",
				"value": {
					"brand": brand_choice
				}
			}
		};
		ws.send(JSON.stringify(request) + "\n");
	});
	var model_dd = document.getElementById("model");
	model_dd.innerHTML = "<option value=\"\" selected disabled>--请选择车型--</option>";
	var version_dd = document.getElementById("version");
	version_dd.innerHTML = "<option value=\"\" selected disabled>--请选择版本--</option>";
	ws.addEventListener("message", function(e) {
		var model_list = JSON.parse(e.data);
		for (let model of model_list) {
			model_dd.innerHTML += "<option value=\"" + model + "\">" + model + "</option>";
		}
	});
};

function get_version_list() {
	var brand_slct = document.getElementById("brand");
	var brand_choice = brand_slct.options[brand_slct.selectedIndex].value;
	var model_slct = document.getElementById("model");
	var model_choice = model_slct.options[model_slct.selectedIndex].value;
	var ws = new WebSocket("ws://175.102.11.202:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "version_list",
				"value": {
					"brand": brand_choice,
					"model": model_choice
				}
			}
		};
		ws.send(JSON.stringify(request) + "\n");
	});
	var version_dd = document.getElementById("version");
	version_dd.innerHTML = "<option value=\"\" selected disabled>--请选择版本--</option>";
	ws.addEventListener("message", function(e) {
		var version_list = JSON.parse(e.data);
		for (let version of version_list) {
			version_dd.innerHTML += "<option value=\"" + version + "\">" + version + "</option>";
		}
	});
};

function get_car_img() {
	var brand_slct = document.getElementById("brand");
	var brand_choice = brand_slct.options[brand_slct.selectedIndex].value;
	var model_slct = document.getElementById("model");
	var model_choice = model_slct.options[model_slct.selectedIndex].value;
	var version_slct = document.getElementById("version");
	var version_choice = version_slct.options[version_slct.selectedIndex].value;
	var ws = new WebSocket("ws://175.102.11.202:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "car_info",
				"value": {
					"brand": brand_choice,
					"model": model_choice,
					"version": version_choice
				}
			}
		};
		ws.send(JSON.stringify(request) + "\n");
	});
	var car_p = document.getElementById("car_photo");
	var car_b = document.getElementById("car_blue");
	ws.addEventListener("message", function(e) {
		var car_info = JSON.parse(e.data);
		car_p.src = car_info.image;
		car_b.src = car_info.blueprint;
	});
};

function get_car_info() {
	var brand_slct = document.getElementById("brand");
	var brand_choice = brand_slct.options[brand_slct.selectedIndex].value;
	var model_slct = document.getElementById("model");
	var model_choice = model_slct.options[model_slct.selectedIndex].value;
	var version_slct = document.getElementById("version");
	var version_choice = version_slct.options[version_slct.selectedIndex].value;
	var ws = new WebSocket("ws://175.102.11.202:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "car_info",
				"value": {
					"brand": brand_choice,
					"model": model_choice,
					"version": version_choice
				}
			}
		};
		ws.send(JSON.stringify(request) + "\n");
	});
	var car_l = document.getElementById("length");
	var car_w = document.getElementById("width");
	var car_h = document.getElementById("height");
	var car_a = document.getElementById("axis");
	var car_fr = document.getElementById("front");
	var car_ba = document.getElementById("back");
	var car_ti = document.getElementById("tire");
	var car_to = document.getElementById("torque");
	ws.addEventListener("message", function(e) {
		var car_info = JSON.parse(e.data);
		car_l.innerHTML = car_info.length;
		car_w.innerHTML = car_info.width;
		car_h.innerHTML = car_info.height;
		car_a.innerHTML = car_info.axis;
		car_fr.innerHTML = car_info.front;
		car_ba.innerHTML = car_info.back;
		car_ti.innerHTML = car_info.tire;
		car_to.innerHTML = car_info.torque;
	});
};

function clean() {
	var model_dd = document.getElementById("model");
	model_dd.innerHTML = "<option value=\"\" selected disabled>--请选择车型--</option>";
	var version_dd = document.getElementById("version");
	version_dd.innerHTML = "<option value=\"\" selected disabled>--请选择版本--</option>";
	document.getElementById("length").innerHTML = "-";
	document.getElementById("width").innerHTML = "-";
	document.getElementById("height").innerHTML = "-";
	document.getElementById("axis").innerHTML = "-";
	document.getElementById("front").innerHTML = "-";
	document.getElementById("back").innerHTML = "-";
	document.getElementById("tire").innerHTML = "-";
	document.getElementById("torque").innerHTML = "-";
	document.getElementById("car_photo").src = "img/placeholder.jpg";
	document.getElementById("car_blue").src = "img/placeholder.jpg";
}

// startup
get_brand_list();