say_hello:
	echo "Hello world"

init_windows:
	python -m venv .venv

init_linux:
	python -m venv my_env

run_venv_windows:
	.\.venv\Scripts\activate	
	python main.py
run_venv_linux:
	source my_env/Scripts/activate	

run_server:
	python main.py