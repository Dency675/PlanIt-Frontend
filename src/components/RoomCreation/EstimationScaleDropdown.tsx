import * as React from "react";
import axios from "axios";
import { selectClasses } from "@mui/joy/Select";
import { InputLabel, Select, SelectChangeEvent } from "@mui/material";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";

interface EstimationData {
  id: number;
  estimationName: string;
}

const storedUserId = localStorage.getItem("userId");

interface EstimationScaleDropdownProps {
  setSelectedEstimationScale: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEstimationScaleId: React.Dispatch<React.SetStateAction<number>>;
}

const EstimationScaleDropdown: React.FC<EstimationScaleDropdownProps> = ({
  setSelectedEstimationScale,
  setSelectedEstimationScaleId,
}) => {
  const [estimationsArray, setEstimationsArray] = React.useState<
    EstimationData[]
  >([]);

  React.useEffect(() => {
    const fetchEstimations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getEstimations/${storedUserId}`
        );
        const responseData: Record<string, EstimationData> = response.data.data;

        const estimationsArray = Object.values(responseData).map((item) => ({
          id: item.id,
          estimationName: item.estimationName,
        }));
        console.log("estimationArray", estimationsArray);
        setEstimationsArray(estimationsArray);
      } catch (error) {
        console.error("Error fetching estimations:", error);
      }
    };

    fetchEstimations();
  }, []);
  const HandleEstimationChange = (e: SelectChangeEvent<string>) => {
    // setSelectedEstimationScale(e.target.value as string);
    const selectedEstimationName = e.target.value as string;
    const selectedEstimation = estimationsArray.find(
      (estimation) => estimation.estimationName === selectedEstimationName
    );
    if (selectedEstimation) {
      setSelectedEstimationScale(selectedEstimation.estimationName);
      setSelectedEstimationScaleId(selectedEstimation.id);
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
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200, // Set max height for the dropdown
          },
        },
      }}
    >
      {estimationsArray.map((item, index) => (
        <MenuItem key={index} value={item.estimationName}>
          {item.estimationName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default EstimationScaleDropdown;
