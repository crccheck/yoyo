test: ## Run test suite
	LOG_LEVEL=$${LOG_LEVEL:-CRITICAL} poetry run python manage.py test

tdd:
	LOG_LEVEL=$${LOG_LEVEL:-CRITICAL} nodemon -e py -x "python manage.py test --failfast --keepdb ${SCOPE}"

bootstrap: ## Set up a dev environment from scratch
	poetry run python manage.py migrate

admin: ## Set up a local insecure admin developer account
	-echo "from django.contrib.auth import get_user_model; \
		User = get_user_model(); \
		User.objects.create_superuser('admin@example.com', 'admin@example.com', 'admin')" | \
		poetry run python manage.py shell
