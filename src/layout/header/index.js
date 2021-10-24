import * as React from "react";
import { Link } from "gatsby";
import ColorSwitcher from "../../components/color-switcher";
import config from "../../../config";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link as Text,
  MenuButton,
} from "theme-ui";
import { useLocation } from "@reach/router";

const IsActiveLink = (path) => {
  const pathName = useLocation().pathname;
  if (
    (pathName === "/" || pathName.includes("blog")) &&
    (path === "/" || path.includes("blog"))
  ) {
    return true;
  }
  if (pathName !== "/") {
    return path.includes(pathName.split("/")[1]);
  }
};

const Header = ({ props }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Flex
        as="nav"
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          mb: 3,
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
          <Heading as="h1" variant="heading" color="red" sx={{ fontSize: 4 }}>
            {"<AS/>"}
          </Heading>
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          <Box
            sx={{
              display: ["none", "none", "inline-flex"],
              a: { textDecoration: "none" },
            }}
          >
            {config.navbar.map((item) => {
              return (
                <Link to={item.path} partiallyActive={true}>
                  <Button
                    key={"home"}
                    variant={IsActiveLink(item.path) ? "cta" : "outline"}
                    sx={{ mr: 3 }}
                  >
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </Box>
        </Flex>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-right",
            alignItems: "centre",
          }}
        >
          <ColorSwitcher title="dark" />
          <MenuButton
            sx={{
              color: "primary",
              display: ["inline-flex", "inline-flex", "none"],
              ml: 2,
              cursor: "pointer",
            }}
            onClick={(e) => {
              setMenuOpen(!menuOpen);
            }}
          />
        </Box>
      </Flex>
      <Divider
        sx={{
          borderBottom: "1.5px solid",
          display: ["inline-flex", "inline-flex", "none"],
        }}
      />

      <Flex>
        <Box
          sx={{
            flexDirection: "column",
            flexBasis: "100%",
            alignItems: "center",
            display: [
              menuOpen ? "inline-flex" : "none",
              menuOpen ? "inline-flex" : "none",
              "none",
            ],
            a: { textDecoration: "none" },
          }}
        >
          {config.navbar.map((item) => {
            return (
              <Link to={item.path}>
                <Text
                  key={item.title}
                  as={"h3"}
                  sx={{ color: "primary", mt: 3 }}
                >
                  {item.title}
                </Text>
              </Link>
            );
          })}
        </Box>
        <Divider sx={{ borderBottom: "1.5px solid", alignItems: "center" }} />
      </Flex>
    </Flex>
  );
};

export default Header;
