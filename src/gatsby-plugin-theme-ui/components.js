import Prism from "@theme-ui/prism";

const CustomPrism = {
  pre: (props) => props.children,
  code: Prism,
};

export default CustomPrism;
