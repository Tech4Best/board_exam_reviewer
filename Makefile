.ONESHELL:
frontend:
	cd ./frontend
	npm run dev

frontend_build:
	cd ./frontend
	npm run build

frontend_serve:
	cd ./frontend
	npm run build
	npm run preview

backend:
	cd ./backend
	python manage.py runserver

say_hello:
	echo "Hello world"

init_windows:
	python -m venv .venv

init_linux:
	python -m venv my_env

run_server:
	python main.py