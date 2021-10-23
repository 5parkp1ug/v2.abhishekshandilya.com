import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link as TLink } from "theme-ui";
import { Badge, Box, Card, Image, Text } from "@theme-ui/components";

const PostCard = (props) => {
  return (
    <Card as={Link} to={props.link} variant="post">
      <Box sx={{ mx: 1, my: 1 }}>
        <GatsbyImage image={getImage(props.heroImage)} alt={props.title} />
        <Box sx={{ mx: 2, my: 2 }}>
            <Text variant="heading" sx={{ fontSize: 3 }}>
              {props.title}
            </Text>
            <p>{props.excerpt}</p>
            <p>
              <Text sx={{ color: "primary" }}>{props.date}</Text> ·{" "}
              <span>{props.timeToRead} min. read</span>
            </p>
            <div>
              {props.tags.map((tag, index) => {
                return (
                  <Link key={`${tag.title}`} to={tag.url}>
                    <Badge
                      variant="outline"
                      sx={{
                        px: 1,
                        py: 1,
                        mr: 2,
                        borderRadius: "extra",
                        fontSize: 0,
                        fontWeight: "bold",
                        color: `${tag.color}`,
                      }}
                    >
                      #{tag.title}
                    </Badge>
                  </Link>
                );
              })}
            </div>
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
