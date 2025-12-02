.PHONY: help setup install dev build start check clean

help:
	@echo "Restaurant Management - Makefile Commands"
	@echo ""
	@echo "  make setup      - Run setup script"
	@echo "  make install    - Install all dependencies"
	@echo "  make dev        - Run in development mode (Docker)"
	@echo "  make build      - Build for production"
	@echo "  make start      - Start production containers"
	@echo "  make check      - Check setup and configuration"
	@echo "  make init-sheets - Initialize Google Sheets"
	@echo "  make clean      - Clean node_modules and build files"
	@echo ""

setup:
	@chmod +x setup.sh
	@./setup.sh

install:
	@echo "Installing backend dependencies..."
	@cd api && pnpm install
	@echo "Installing frontend dependencies..."
	@cd ui && pnpm install

dev:
	@docker-compose -f docker-compose.dev.yml up --build

build:
	@docker-compose build

start:
	@docker-compose up -d

check:
	@cd api && pnpm run check-setup

init-sheets:
	@cd api && pnpm run create-sheets

clean:
	@echo "Cleaning..."
	@rm -rf api/node_modules api/dist
	@rm -rf ui/node_modules ui/.next ui/out
	@echo "Done!"

