import { Card, Tooltip } from "antd";

const CategoryItem = ({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl: string;
}) => {
  return (
    <Card
      hoverable
      style={{ width: 200, margin: "10px" }}
      cover={
        <img
          alt={name}
          src={imageUrl}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
    >
      <Card.Meta
        title={
          <Tooltip title={name}>
            <span>{`${name}`}</span>
          </Tooltip>
        }
      />
    </Card>
  );
};

export default CategoryItem;
