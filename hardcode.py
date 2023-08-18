import asyncio
import websockets
import json
import base64


async def handle_request(websocket):
    truck_message = {"供应商": "鸿宇轿运", "板车": "A型: 长头7位车", "车型": "XT6_2023", "版本": "六座四驱铂金型黑钻版"}
    car_message = {"生产基地": "上海凯迪", "品牌": "凯迪拉克", "车型": "XT6_2023", "版本": "六座四驱铂金型黑钻版", \
                   "长（MM）": 5056, "宽（MM）": 1964, "高（MM）": 1780, "接近角（°）": 16, "离去角（°）": 21, \
                   "轴距(MM)": 2863, "前轮距(MM)": 1687, "后轮距(MM)": 1683, "轮胎尺寸": "235/55_R20", "扭矩数据(N*m)": 350}
    supplier_message = {"supplier": "鸿宇轿运", "truck_list": "A型: 长头7位车", "email": "xxx@yyy.com", "phone": "+86-12345678901"}
    async for message in websocket:
        print(message)
        # await websocket.send(json.dumps(truck_message, ensure_ascii=False))
        # await websocket.send(json.dumps(car_message, ensure_ascii=False))
        await websocket.send(json.dumps(supplier_message, ensure_ascii=False))
    

    # image_path = "img/supp/six_suv.jpg"
    # with open(image_path, 'rb') as image_file:
    #     image_data = image_file.read()
    # base64_image = base64.b64encode(image_data).decode('utf-8')
    # await websocket.send(base64_image)


async def main():
    async with websockets.serve(handle_request, "", 8001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
