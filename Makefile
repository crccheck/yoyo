tdd: ## Run test with a watcher
	ptw tests -- -sx

test: ## Run test suite
	pytest tests --cov
