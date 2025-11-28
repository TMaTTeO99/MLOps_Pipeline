# LongWayTopBE
Simple python server used to handle the following users' requests:

1. Upload .csv file
2. Data cleaning
3. Training
4. Prediction

## Instructions to Run
In the current folder there is a Dockerfile to build a docker container. The user must have installed docker on the own machine.

### To build the docker image follow these instructions:

1. Open a terminal in the LongWayTopBE folder
2. Run : docker build -t < image-name > .

### To run a docker container follow these instructions:
1. Run: docker run -p 5000:5000 -d < image-name >
