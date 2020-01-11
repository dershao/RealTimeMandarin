import asyncio
import numpy as np
import aiohttp
from aiohttp import web
from aiohttp.web import middleware
import aiohttp_cors
import cv2

ML_HOST = "http://localhost:5000/classify"


async def hello(request):
    """
        Test endpoint
    """
    return web.Response(text="Pong")


async def resize_image(img_array, height=128, width=128):
    """
        Resize image with OpenCV library to height and width expected by ML service.

        Args:
            img_array: Array of pixel values
            height: Desired height of image
            width: Desire width of image
        
        Returns:
            Array of pixel values with desired dimensions
    """

    return cv2.resize(img_array.astype('uint8'), (height, width), interpolation=cv2.INTER_AREA)


async def send_classify_request(request):
    """
        Resize image and send to ML service for classification
    """

    body = await request.json()
    
    # get the raw pixel values
    data = np.array(body['data']['attributes']['image'])

    # get the number of image channels
    channels = body['data']['attributes']['channels'] 

    # calculate the image dimensions (H * W * channels)
    shape = data.shape[0] // channels
    height = width = int(shape ** 0.5)

    img_array = data.reshape(height, width, channels)

    img = await resize_image(img_array)

    # Currently, we are only concerned with grayscale values
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
