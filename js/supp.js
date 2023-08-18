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
			supp_dd.innerHTML += "<option value=\"" + supp + "\">" + supp + "</option>"
		}
	});
};

function get_supp_info() {
	var supp_slct = document.getElementById("supp");
	var supp_choice = supp_slct.options[supp_slct.selectedIndex].value;
	var ws = new WebSocket("ws://localhost:8001");
	ws.addEventListener("open", function(e) {
		var request = {
			"method": "GET",
			"params": {
				"key": "supp_info",
				"value": {
					"supplier": supp_choice
				}
			}
		};
		ws.send(JSON.stringify(request)+"\n");
	});
	var supp_e = document.getElementById("email");
	var supp_p = document.getElementById("phone");
	var truck_dd = document.getElementById("truck");
	ws.addEventListener("message", function(e) {
		var supp_info = JSON.parse(e.data);
		supp_e.innerHTML = supp_info.email;
		supp_p.innerHTML = supp_info.phone;
		var truck_list = supp_info.truck_list;
		for (let truck of truck_list) {
			truck_dd.innerHTML += "<option value=\"" + truck + "\">" + truck + "</option>"
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
	var truck_s = document.getElementById("truck_size");
	var truck_p = document.getElementById("truck_photo");
	var angles = document.getElementById("angles");
	var angle_list = angles.querySelectorAll("img");
	for (let img of angle_list) {
		img.src = "img/supp/placeholder.jpg";
	}
	ws.addEventListener("message", function(e) {
		var truck_info = JSON.parse(e.data);
		truck_s.innerHTML = truck_info.size;
		truck_p.src = truck_info.image;
		for (let i = 0; i < truck_info.angles.length; i++) {
			angle_list[i].src = truck_info.angles[i]
		}
	});
};

// startup
get_supp_list();
