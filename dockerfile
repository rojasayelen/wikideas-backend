FROM node:18.15.0

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3000 

CMD ["node", "/home/app/app.js"]