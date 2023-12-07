FROM nginx:1.24.0

# RUN apt-get update && \
#     apt-get install -y apt-utils curl \
#     locales && \
#     echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
#     locale-gen ja_JP.UTF-8

# ENV LC_ALL ja_JP.UTF-8

# ADD fastapi.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
COPY conf/fastapi.conf /etc/nginx/conf.d/default.conf
