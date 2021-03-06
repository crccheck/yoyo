import json


def merge_json(incoming, existing):
    in_data = json.loads(incoming)
    existing_data = json.loads(existing)
    out_data = {**in_data, **existing_data}
    return json.dumps(out_data, indent=2)  # TODO add trailing newline?
