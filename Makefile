.POSIX:
SHELL := /bin/bash
NODE := $(shell which node)
pull:
	$(NODE) ./scripts/pull.js

push:
	$(NODE) ./scripts/push.js
