FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY server.py ./
ENV MODE production

CMD [ "python", "server.py" ]