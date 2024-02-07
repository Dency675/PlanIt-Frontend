import * as React from "react";
import axios from "axios";
import { selectClasses } from "@mui/joy/Select";
import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";

interface CalculationData {
  id: number;
  calculationName: string;
}

interface CalculationMethodDropdownProps {
  setSelectedCalculationMethod: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCalculationMethodId: React.Dispatch<React.SetStateAction<number>>;
}

const CalculationMethodDropdown: React.FC<CalculationMethodDropdownProps> = ({
  setSelectedCalculationMethod,
  setSelectedCalculationMethodId,
}) => {
  const [calculationArray, setCalculationArray] = React.useState<
    CalculationData[]
  >([]);

  React.useEffect(() => {
    const fetchEstimations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getAllCalculations"
        );
        const responseData: Record<string, CalculationData> = response.data;

        console.log("responseData");
        console.log(responseData.data);
        const calculationArray = Object.values(responseData).map((item) => ({
          id: item.id,
          calculationName: item.calculationName,
        }));

        console.log("calculationArray");
        console.log(calculationArray);

        setCalculationArray(calculationArray);
      } catch (error) {
        console.error("Error fetching calculation Method:", error);
      }
    };

    fetchEstimations();
  }, []);
  const HandleEstimationChange = (e: SelectChangeEvent<string>) => {
    const selectedEstimationName = e.target.value as string;
    const selectedEstimation = calculationArray.find(
      (calculation) => calculation.calculationName === selectedEstimationName
    );
    if (selectedEstimation) {
      setSelectedCalculationMethod(selectedEstimation.calculationName);
      setSelectedCalculationMethodId(selectedEstimation.id);
    }
  };

  return (
    <Select
      placeholder="Select Scale"
      fullWidth
      size="small"
      onChange={HandleEstimationChange}
      IconComponent={KeyboardArrowDown}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {calculationArray.map((item, index) => (
        <MenuItem key={index} value={item.calculationName}>
          {item.calculationName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CalculationMethodDropdown;
