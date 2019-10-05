import asyncio
import numpy as np
import aiohttp
from aiohttp import web
import cv2

ML_HOST = "http://ml-service/classify"

async def hello(request):
    return web.Response(text="Pong")


async def resize_image(img_array, height=28, width=28):

    img_array = img_array.reshape(256, 256, 4)

    return cv2.resize(img_array.astype('uint8'), (height, width), interpolation=cv2.INTER_AREA)

async def send_classify_request(request):
    body = await request.json()
    data = body['data']['image']

    img = await resize_image(np.array(data))
    img = img[:, :, 3:]

    async with aiohttp.ClientSession() as session:
        async with session.post('http://localhost:5000/classify', json={'data': {'attributes': {'grayscale': img.tolist() }}}) as resp:
            response = await resp.json()

    return web.json_response(response)  

app = web.Application(client_max_size=2097152)
app.add_routes([web.get('/', hello), web.post('/classify', send_classify_request)])

web.run_app(app)
