import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const MyCard = ({ title, value, color }) => {
  const cardStyle = {
    backgroundColor: color,
  };

  return (
    <Card style={cardStyle}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
