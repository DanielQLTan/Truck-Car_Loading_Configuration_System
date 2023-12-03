// data
const supp_list = ["供应商 1", "供应商 2", "供应商 3"];
const truck_list = ["板车 A", "板车 B"];
const car_list = [	"凯迪拉克 Lyriq",
					"凯迪拉克 CT4(轿跑)",
					"凯迪拉克 CT5(FULL SIZE)",
					"凯迪拉克 CT6(FULL SIZE)",
					"凯迪拉克 XT4(MINI SUV)",
					"凯迪拉克 XT5(SUV)",
					"凯迪拉克 XT6(FULL SUV)",
					"凯迪拉克 GT4"];
const suv = ["凯迪拉克 XT5(SUV)", "凯迪拉克 XT6(FULL SUV)"];
const mix = ["凯迪拉克 Lyriq", "凯迪拉克 XT4(MINI SUV)", "凯迪拉克 GT4"];
const car_value_list = ["lyriq",
						"CT4",
						"CT5",
						"CT6",
						"XT4",
						"XT5",
						"XT6",
						"GT4"];

// operations
function get_supp_list() {
	var supp_dd = document.getElementById("supp");
	for (let supp of supp_list) {
		supp_dd.innerHTML += "<option value=\"" + supp + "\">" + supp + "</option>";
	}
}

function get_truck_list() {
	var truck_dd = document.getElementById("truck");
	for (let truck of truck_list) {
		var index = truck_list.indexOf(truck) + 2
		truck_dd.innerHTML += "<option value=" + index + ">" + truck + "</option>";
	}
}

function get_truck_info() {
	var truck_slct = document.getElementById("truck");
	var truck_choice = truck_slct.options[truck_slct.selectedIndex].value;
	var truck_p = document.getElementById("truck_photo");
	truck_p.src = "img/car/truck" + truck_choice + ".jpg";
}

function get_car_info(index) {
	var car_slct = document.getElementById("car-model-" + index);
	var car_choice = car_slct.options[car_slct.selectedIndex].value;
	var car_p = document.getElementById("car_photo");
	car_p.src = "img/filter/" + car_choice + ".png";
	var car_n = document.getElementById("car_name");
	car_n.innerHTML = car_slct.options[car_slct.selectedIndex].text;
}

function get_car_list_1() {
	var car_dd = document.getElementById("car-model-1");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
	}
}

function get_car_list_2() {
	var car_dd = document.getElementById("car-model-2");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
	}
}

function get_car_list_3() {
	var car_dd = document.getElementById("car-model-3");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
	}
}

function get_car_list_4() {
	var car_dd = document.getElementById("car-model-4");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
	}
}

function get_car_list_5() {
	var car_dd = document.getElementById("car-model-5");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		if (suv.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + " disabled>[⨯] " + car + "</option>";
		} else if (mix.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + ">[?] " + car + "</option>";
		} else {
			car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
		}
	}
}

function get_car_list_6() {
	var car_dd = document.getElementById("car-model-6");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		if (suv.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + " disabled>[⨯] " + car + "</option>";
		} else if (mix.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + ">[?] " + car + "</option>";
		} else {
			car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
		}
	}
}

function get_car_list_7() {
	var car_dd = document.getElementById("car-model-7");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		if (suv.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + " disabled>[⨯] " + car + "</option>";
		} else if (mix.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + ">[?] " + car + "</option>";
		} else {
			car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
		}
	}
}

function get_car_list_8() {
	var car_dd = document.getElementById("car-model-8");
	for (let car of car_list) {
		var value = car_value_list[car_list.indexOf(car)]
		if (suv.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + " disabled>[⨯] " + car + "</option>";
		} else if (mix.includes(car)) {
			car_dd.innerHTML += "<option value=" + value + ">[?] " + car + "</option>";
		} else {
			car_dd.innerHTML += "<option value=" + value + ">[✓] " + car + "</option>";
		}
	}
}

// startup
get_supp_list();
get_car_list_1();
get_car_list_2();
get_car_list_3();
get_car_list_4();
// get_car_list_5();
get_car_list_6();
get_car_list_7();
get_car_list_8();