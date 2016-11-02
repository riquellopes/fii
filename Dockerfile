FROM node:6.5
MAINTAINER Henrique Lopes

RUN mkdir /api
WORKDIR /api

ADD . /api/

# Installing project dependencies.
RUN npm install
