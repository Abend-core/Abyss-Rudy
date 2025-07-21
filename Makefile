run:
	doppler run -- docker compose up

init-sql:
	doppler run -- bash scripts/generate-init-sql.sh

clean-init:
	rm -f server/sql/init.sql

setup: init-sql run clean-init

clean-volume:
	docker compose down -v
	$(MAKE) clean-init

reset: clean-volume setup