FROM nginx:latest

COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

EXPOSE 80

RUN chmod 644 /usr/share/nginx/html/index.html
RUN chmod 644 /usr/share/nginx/html/script.js
RUN chmod 644 /usr/share/nginx/html/styles.css

CMD [ "nginx", "-g", "daemon off;" ]