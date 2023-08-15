import asyncio
import websockets
import json
from pymongo import MongoClient

print('start')

client = MongoClient("localhost", 27017)

async def handle_request(websocket, path):
    async for message in websocket:
        try:
            request = json.loads(message)
            if "method" in request and request["method"] == "GET":
                key = request["params"]["key"]
                value = request["params"]["value"] #a dictionary
                db = client["demo"]
                collection = db[key]
                cols = [val for val in value.values()]
                document = collection.find_one()
                result = {col: document.get(col) for col in cols}
                if result:
                    response = {"data": result}
                else:
                    response = {"error": "Data not found"}
            else:
                response = {"error": "Invalid request"}
            await websocket.send(json.dumps(response, ensure_ascii=False))
        except Exception as e:
            response = {"error": str(e)}
            await websocket.send(json.dumps(response))

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