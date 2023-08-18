import asyncio
import websockets
import json


async def handle_request(websocket):
    async for message in websocket:
        try:
            # Message looks like dictionary or json, but is a str, so we need to load it first.
            req = json.loads(message)
            param = req["params"]

            # Startup
            if "value" not in param:
                # Truck OR supplier page startup
                if param["key"] == "supp_list":
                    res = ["鸿宇轿运"]
                    await websocket.send(json.dumps(res, ensure_ascii=False))
                if param["key"] == "car_model_list":
                    res = ["凯迪拉克 XT6 2023"]
                    await websocket.send(json.dumps(res, ensure_ascii=False))
                # Car page startup
                if param["key"] == "brand_list":
                    res = ["凯迪拉克"]
                    await websocket.send(json.dumps(res, ensure_ascii=False))
            
            # Choices
            else:
                # val is a dictionary
                val = param["value"]
                if len(val) == 1:
                    if val == {"supplier": "某供应商"} and param["key"] == "truck_list":
                        res = ["A型: 长头7位车"]
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                    if val == {"car-model": "某轿车车型"}:
                        res = ["六座四驱铂金型黑钻版"]
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                    if val == {"supplier": "某供应商"} and param["key"] == "supp_info":
                        res = {"email": "xxx@yyy.com", "phone": "+86-12345678901",
                               "truck_list": ["A型: 长头7位车"]}
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                    if val == {"brand": "某品牌"}:
                        res = ["XT6_2023"]
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                if len(val) == 2:
                    if val == {"supplier": "某供应商", "truck": "某板车"} and param["key"] == "truck_info":
                        res = {"image": "/img/truck/truck.jpg",
                               "size": {"x": 2275, "y": 754},
                               "positions": [{"x": 232, "y": 102, "z": "⨯", "r": "高风险:车长过长且超过限高"}, 
                                             {"x": 776, "y": 168, "z": "✓", "r": "安全"}, 
                                             {"x": 1334, "y": 168, "z": "✓", "r": "安全"},
                                             {"x": 1880, "y": 168, "z": "✓", "r": "安全"},
                                             {"x": 770, "y": 356, "z": "⨯", "r": "高风险:与板车上板产生碰擦"},
                                             {"x": 1358, "y": 416, "z": "?", "r": "可能保险杠擦地"},
                                             {"x": 1980, "y": 392, "z": "?", "r": "尾部可能探出"}]}
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                    if val == {"supplier": "某供应商", "truck": "某板车"} and param["key"] == "supp_truck":
                        res = {"size": "17100*2100*5000","image": "/img/truck/truck.jpg",
                               "angles": ["/img/supp/six_suv.jpg", "/img/supp/end.jpg", 
                                          "/img/supp/slope.jpg", "/img/supp/left.jpg",
                                          "/img/supp/head.jpg", "/img/supp/side.jpg"]}
                    if val == {"brand": "某品牌", "model": "某车型"}:
                        res = ["六座四驱铂金型黑钻版"]
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                    if val == {"car-model": "某轿车车型", "car-version": "某轿车版本"}:
                        res = {"image": "/img/car/truck3.jpg",
                               "size": {"x": 2275, "y": 754},
                               "positions": [{"x": 232, "y": 102, "z": "⨯", "r": "高风险:车长过长且超过限高"}, 
                                             {"x": 776, "y": 168, "z": "✓", "r": "安全"}, 
                                             {"x": 1334, "y": 168, "z": "✓", "r": "安全"},
                                             {"x": 1880, "y": 168, "z": "✓", "r": "安全"},
                                             {"x": 770, "y": 356, "z": "⨯", "r": "高风险:与板车上板产生碰擦"},
                                             {"x": 1358, "y": 416, "z": "?", "r": "可能保险杠擦地"},
                                             {"x": 1980, "y": 392, "z": "?", "r": "尾部可能探出"}]}
                        await websocket.send(json.dumps(res, ensure_ascii=False))
                if len(val) == 3:
                    res = {"image": "/img/car/photo.jpg", "blueprint": "/img/car/blueprint.jpg",
                           "length": 5056, "width": 1964, "height": 1780, "axis": 2863, 
                           "front": 1687, "back": 1683, "tire": "235/55_R20", "torque": 350}
                    await websocket.send(json.dumps(res, ensure_ascii=False))



        except Exception as e:
            res = {"error": str(e)}
            await websocket.send(json.dumps(res))


async def main():
    async with websockets.serve(handle_request, "localhost", 8001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())