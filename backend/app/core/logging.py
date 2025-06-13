import logging
import sys
import os
from logging.handlers import RotatingFileHandler
from colorlog import ColoredFormatter
from dotenv import load_dotenv

# Загружаем .env файл
load_dotenv()

# Уровень логирования из переменных окружения, по умолчанию DEBUG
LOG_LEVEL = os.getenv("LOG_LEVEL", "DEBUG")

# Формат лога
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
COLOR_LOG_FORMAT = "%(log_color)s" + LOG_FORMAT

# Путь к файлу лога
LOG_FILE = "logs/app.log"

def setup_logging():
    """Настройка системы логирования"""
    # Создаем директорию для логов
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

    # Настраиваем корневой логгер
    root_logger = logging.getLogger()
    root_logger.setLevel(LOG_LEVEL)

    # Обработчик для консоли (с цветом)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(LOG_LEVEL)

    # Цветной форматтер
    color_formatter = ColoredFormatter(
        COLOR_LOG_FORMAT,
        log_colors={
            'DEBUG': 'cyan',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'red,bg_white',
        }
    )
    console_handler.setFormatter(color_formatter)

    # Обработчик для файла
    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    file_handler.setLevel(LOG_LEVEL)
    file_formatter = logging.Formatter(LOG_FORMAT)
    file_handler.setFormatter(file_formatter)

    # Добавляем обработчики
    root_logger.addHandler(console_handler)
    root_logger.addHandler(file_handler)

    # Устанавливаем уровень логирования для SQLAlchemy
    logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)

    return root_logger

# Создаем логгер
logger = setup_logging()
