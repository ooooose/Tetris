from logging import INFO, Logger, getLogger

def get_logger(name: str) -> Logger:
    logger = getLogger(name)
    logger.setLevel(INFO)
    return logger
