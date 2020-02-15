install: ## Install requirements
	@[ -n "${VIRTUAL_ENV}" ] || [ -f ".python-version" ] || (echo "ERROR: This should be run from a virtualenv" && exit 1)
	pip install -r requirements.txt

.PHONY: requirements.txt
requirements.txt: ## Regenerate requirements.txt
	pip-compile requirements.in > $@
