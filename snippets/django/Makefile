MANAGE=poetry run python project/manage.py

test: ## Run test suite
	LOG_LEVEL=$${LOG_LEVEL:-CRITICAL} $(MANAGE) test

tdd:
	LOG_LEVEL=$${LOG_LEVEL:-CRITICAL} nodemon -e py -x "$(MANAGE) test --failfast --keepdb ${SCOPE}"

bootstrap: ## Set up a dev environment from scratch
	$(MANAGE) migrate

admin: ## Set up a local insecure admin developer account
	-echo "from django.contrib.auth import get_user_model; \
	  User = get_user_model(); \
	  User.objects.create_superuser('admin@example.com', 'admin@example.com', 'admin')" | \
	  $(MANAGE) shell
