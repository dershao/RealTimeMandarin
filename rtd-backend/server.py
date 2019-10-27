import asyncio
import numpy as np
import aiohttp
from aiohttp import web
from aiohttp.web import middleware
import aiohttp_cors
import cv2

ML_HOST = "http://localhost:5000/classify"


async def hello(request):
    return web.Response(text="Pong")


async def resize_image(img_array, height=28, width=28, channels=4):

    img_array = img_array.reshape(height, width, channels)

    return cv2.resize(img_array.astype('uint8'), (height, width), interpolation=cv2.INTER_AREA)


async def send_classify_request(request):
    body = await request.json()
    data = body['data']['attributes']['image']

    img = await resize_image(np.array(data))
    img = img[:, :, 3:]

    async with aiohttp.ClientSession() as session:
        async with session.post(ML_HOST, json={'data': {'attributes': {'grayscale': img.tolist() }}}) as resp:
            response = await resp.json()
    return web.json_response(response)

app = web.Application(client_max_size=2097152)
cors = aiohttp_cors.setup(app)

resource = cors.add(app.router.add_resource("/classify"))
route = cors.add(
    resource.add_route("POST", send_classify_request), {
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=False,
            allow_headers=("Content-Type",),
            expose_headers="*"
        )
    })  

web.run_app(app)
