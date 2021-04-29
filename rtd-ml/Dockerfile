FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py ./
COPY models/characters-six-v1.h5 ./models/

CMD [ "python", "app.py" ]