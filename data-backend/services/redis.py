import redis

from config import REDIS_HOST, REDIS_PORT

_ENGINE = None


def get_redis():
    global _ENGINE

    if _ENGINE is None:
        _ENGINE = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
    return _ENGINE

