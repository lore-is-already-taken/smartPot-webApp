import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface Mydata {
  texto: string;
  value: string;
}

const OutlinedCard: React.FC<Mydata> = (prop) => {
  const valor = Number(prop.value);
  const [maxValue, setMaxValue] = React.useState(0);
  const [minValue, setMinVaue] = React.useState(100);
  if (valor > maxValue) {
    setMaxValue(valor);
  } else if (valor < minValue && valor > 0) {
    setMinVaue(valor);
  }

  return (
    <Box sx={{ minWidth: 275, mb: 3, ml: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {prop.texto}
            {bull}
            {prop.value}
          </Typography>

          <br />
          <Typography variant="body2">
            Min: {bull} {minValue}°
          </Typography>

          <br />
          <Typography variant="body2">
            Max {bull} {maxValue}°
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OutlinedCard;
