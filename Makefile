# ==============================================================================
# Переменные проекта
# ==============================================================================

# Попытка найти полный путь к pnpm, если он не в PATH
PNPM     := $(shell which pnpm 2>/dev/null || echo pnpm)
PORT     ?= 3000
NODE_ENV ?= development

# Цвета для вывода в терминал
CYAN   := \033[36m
GREEN  := \033[32m
YELLOW := \033[33m
RED    := \033[31m
RESET  := \033[0m

.DEFAULT_GOAL := help
.PHONY: help install dev build start clean lint lint-fix type-check format format-check tasks fix check

# ==============================================================================
# Справка
# ==============================================================================

help: ## Показать это сообщение
	@echo "Использование: make [команда]"
	@echo ""
	@echo "$(YELLOW)Разработка:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## @dev .*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## @dev "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Проверка и Качество:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## @quality .*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## @quality "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Проект и Задачи:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## @project .*' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## @project "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(YELLOW)Другое:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## [^@].*' $(MAKEFILE_LIST) | grep -v "help" | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2}'

# ==============================================================================
# Разработка
# ==============================================================================

install: ## @dev Установить зависимости проекта
	@echo "$(GREEN)Установка зависимостей...$(RESET)"
	@$(PNPM) install

dev: ## @dev Запустить сервер разработки (порт $(PORT))
	@echo "$(GREEN)Запуск сервера разработки на порту $(PORT)...$(RESET)"
	@NODE_ENV=$(NODE_ENV) PORT=$(PORT) $(PNPM) run dev

build: ## @dev Собрать проект для продакшена
	@echo "$(GREEN)Сборка проекта...$(RESET)"
	@$(PNPM) run build

start: ## @dev Запустить продакшен-сервер (порт $(PORT))
	@echo "$(GREEN)Запуск сервера из сборки на порту $(PORT)...$(RESET)"
	@PORT=$(PORT) $(PNPM) run start

# ==============================================================================
# Проверка и Качество
# ==============================================================================

lint: ## @quality Запустить линтер (ESLint)
	@echo "$(GREEN)Проверка линтером...$(RESET)"
	@$(PNPM) run lint

lint-fix: ## @quality Исправить ошибки линтера
	@echo "$(GREEN)Исправление ошибок линтера...$(RESET)"
	@$(PNPM) run lint -- --fix

type-check: ## @quality Проверить типы TypeScript
	@echo "$(GREEN)Проверка типов TypeScript...$(RESET)"
	@$(PNPM) exec tsc --noEmit

format: ## @quality Отформатировать код с Prettier
	@echo "$(GREEN)Форматирование кода...$(RESET)"
	@$(PNPM) dlx prettier --write "./app/**/*.{ts,tsx}" "./components/**/*.{ts,tsx}" "./lib/**/*.{ts,tsx}" "./hooks/**/*.{ts,tsx}"

format-check: ## @quality Проверить форматирование кода
	@echo "$(GREEN)Проверка форматирования...$(RESET)"
	@$(PNPM) dlx prettier --check "./app/**/*.{ts,tsx}" "./components/**/*.{ts,tsx}" "./lib/**/*.{ts,tsx}" "./hooks/**/*.{ts,tsx}"

fix: lint-fix format ## @quality Исправить всё: линтер и форматирование

check: lint type-check format-check ## @quality Запустить все проверки (CI)

# ==============================================================================
# Проект и Задачи
# ==============================================================================

tasks: ## @project Список незавершенных задач из спецификаций (.kiro)
	@echo "$(YELLOW)Текущие незавершенные задачи из .kiro/specs:$(RESET)"
	@grep -r "\[ \]" .kiro/specs/ --include="tasks.md" | sed 's|^./.kiro/specs/||' | sed 's|:  - \[ \] |: |' | awk -F: '{printf "  $(CYAN)%-30s$(RESET) %s\n", $$1, $$2}'

clean: ## @project Очистить артефакты сборки и кеши
	@echo "$(RED)Очистка проекта...$(RESET)"
	@rm -rf .next
	@rm -rf node_modules/.cache
	@rm -rf out
	@rm -rf .turbo
	@echo "$(GREEN)Очистка завершена.$(RESET)"
