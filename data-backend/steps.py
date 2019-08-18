import json
import redis
from config import REDIS_HOST, REDIS_PORT

r = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)


def new_task(payload: dict):
    try:
        print("Executing step")
        r.publish("task_success", json.dumps(payload))
    except Exception as e:
        r.publish("task_failure", json.dumps(payload))
        print("Oh no, error")


def get_step_func(step_name: str) -> callable:
    return {
        "new_task": new_task
    }[step_name]
