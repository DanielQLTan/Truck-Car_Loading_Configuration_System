import asyncio
import websockets
import json
from pymongo import MongoClient
from bson import ObjectId

print('start')

client = MongoClient("localhost", 27017)
db = client["demo"]

async def handle_request(websocket):
    async for message in websocket:
        try:
            request = json.loads(message)

            # Truck
            if "method" in request and request["method"] == "GET":
                key = request["params"]["key"]
                value = request["params"]["value"] #a dictionary
                collection = db[key]
                cols = [val for val in value.values()]
                document = collection.find_one()
                result = {col: document.get(col) for col in cols}
                if result:
                    response = {"truck": result}
                else:
                    response = {"error": "Data not found"}
            else:
                response = {"error": "Invalid request"}
            await websocket.send(json.dumps(response, ensure_ascii=False))

            # Car
            single_car = db['car_simple']
            car_doc = single_car.find_one()
            car_mes = {"car": car_doc}
            await websocket.send(json.dumps(car_mes, default = str, ensure_ascii=False))

            # Supplier
            single_supplier = db['supplier']
            sup_doc = single_supplier.find_one()
            sup_mes = {"supplier": sup_doc}
            await websocket.send(json.dumps(sup_mes, default = str, ensure_ascii=False))

            # Blob
            image_data = get_image_data(db)
            await websocket.send(image_data)


            # image_filename = "six_suv.jpg"  # Replace with the filename of your image
            # image_file = db.fs.find_one({"filename": image_filename})
            # if image_file:
            #     # Encode the image data as base64
            #     image_data = base64.b64encode(image_file.read()).decode('utf-8')
            #     # Send the image data to the client
            #     await websocket.send(image_data)
            
        except Exception as e:
            response = {"error": str(e)}
            await websocket.send(json.dumps(response))


# helper function for sending binary string of the image
def get_image_data(db):
    # Retrieve the image chunks from the fs.chunks collection
    chunks_cursor = db.fs.chunks.find({"files_id": ObjectId('64dd8597d5a2d85f7cb10336')})
    # Assemble the chunks into a single byte array
    image_data = b""
    for chunk in chunks_cursor:
        image_data += chunk["data"]
    return image_data


async def main():
    async with websockets.serve(handle_request, "localhost", 8001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())



# import asyncio
# import websockets

# async def handler(websocket):
#     async for message in websocket:
#         print(message)

# async def main():
#     async with websockets.serve(handler, "", 8001):
#         await asyncio.Future()  # run forever

# if __name__ == "__main__":
#     asyncio.run(main())