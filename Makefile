tdd: ## Run test with a watcher
	ptw tests yoyo -- -sx

test: ## Run test suite
	pytest tests --cov
