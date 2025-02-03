# Board Exam Reviewer 
This Board exam reviewer is an open source implementation of a progressive web application designed to help students who are studying for board exams to fully study without the additional costs of review centers.

## Features
- [ ] Mock Exams
- [ ] Full Offline usage after initial setup

## Todo
- [ ] Finalize Design 
- [ ] Add documentation for Installation and deployment

## Tech Stack
- This application uses a PWA via SvelteKit for the frontend and a Django (python) on the backend.

## Set Up
In order to fully use this system, you have to:
1. Download Node & npm
    - If you're using windows:
        - Download the Node JS installer and install it,
        - After installation, kindly test the setup via running
            - ``` node --version ```
            - ``` npm --version```
        - If npm is not found or recognized, you have to update your PATH variables so that npm is seen by the windows command line.
2. Download Python and install virtualenv
    - ```pip install virtualenv``` for windows and certain linux distros
    - ```pip3 install virtualenv``` for most linux distros
3. Download Git clone this project via
    - ```git clone <link>```
4. Create a Virtual Environment ```python -m venv .venv``` and activate it.
    - For Windows the command is ```activate .venv``` whereas in linux it is ```source .venv/bin/activate```
5. Go to the frontend folder and install the dependencies via ```npm run isntall```.
6. Go to the backend folder and install the dependencies via ``` pip install -r requirements.txt```.
    - REMEMBER: Always make sure that the virtual environment is activated first.