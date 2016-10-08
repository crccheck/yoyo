install: ## Install requirements
	@[ -n "${VIRTUAL_ENV}" ] || (echo "ERROR: This should be run from a virtualenv" && exit 1)
	pip install -r requirements.txt

requirements.txt: ## Regenerate requirements.txt
requirements.txt: requirements.in
	pip-compile $< > $@

