import Link from "./Link";
import Card from "./Card";
import Tabs from "./Tab";
function customizeComponents(theme) {
  return { ...Link(), ...Card(theme), ...Tabs(theme) };
}

export default customizeComponents;
