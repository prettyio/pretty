.POSIX:
SHELL := /bin/bash
NODE := $(shell which node)
pull:
	@echo "  pull: Pulls the latest version of the repository"
	$(NODE) ./scripts/pull.js

push:
	@echo "  push: Pushes the latest version of the repository"
	$(NODE) ./scripts/push.js

tag:
	@echo "  tag: Tags the latest version of the repository"
	$(NODE) ./scripts/tag.js
