import { isNull } from "util";

export function onlyProperty(properties, container, lightweight = null) {
  if (isNull(lightweight)) {
    lightweight = {}
  }
  properties.map(name => {
    lightweight[name] = container[name];
  });
  lightweight.children = container.children.map((chaild) =>
    onlyProperty(properties, chaild)
  );
  return lightweight;
}