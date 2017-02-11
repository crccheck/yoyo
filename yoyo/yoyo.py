import ruamel.yaml as yaml

# read .yoyo.yml
with open('.yoyo.yml') as fh:
    data = yaml.safe_load(fh)

print(data)
