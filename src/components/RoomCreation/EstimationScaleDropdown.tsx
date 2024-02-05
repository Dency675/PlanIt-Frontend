// EstimationScaleDropdown.tsx
import * as React from "react";
import axios from "axios";
// import Select from "@mui/material";
import { Select, SelectChangeEvent } from "@mui/material";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import selectClasses from "@mui/joy/Select/selectClasses";

interface EstimationData {
  id: number;
  estimationName: string;
}

const EstimationScaleDropdown: React.FC = () => {
  const [estimationsArray, setEstimationsArray] = React.useState<
    EstimationData[]
  >([]);

  const [selectedEstimation, setSelectedEstimation] =
    React.useState<String>("");

  React.useEffect(() => {
    const fetchEstimations = async () => {
      try {
        const response = await axios.get(
<<<<<<< HEAD
          "http://localhost:3001/getEstimations"
=======
          "http://localhost:3000/getEstimations"
>>>>>>> fe2ecd0 (implemented search functionality)
        );
        const responseData: Record<string, EstimationData> = response.data;

        const estimationsArray = Object.values(responseData).map((item) => ({
          id: item.id,
          estimationName: item.estimationName,
        }));

        setEstimationsArray(estimationsArray);
        // console.log(estimationsArray);

        // estimationsArray.map((item, index) => {
        //   console.log(estimationsArray[index].estimationName);
        // });
      } catch (error) {
        console.error("Error fetching estimations:", error);
      }
    };

    fetchEstimations();
  }, []);
  // const handleEstimationChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   setSelectedEstimation(event.target.value as string);
  // };
  interface EstimationProps {
    handleEstimationChange: (e: SelectChangeEvent<string>) => void;
    selectedEstimation: string; // Assuming selectedEstimation is a string
  }
  const HandleEstimationChange = (e: SelectChangeEvent<string>) => {
    setSelectedEstimation(e.target.value);
    // console.log(e.target.value);
  };
  React.useEffect(() => {
    console.log("selectedEstimation");
    console.log(selectedEstimation);
  }, [selectedEstimation]);

  return (
    <Select
      placeholder="Select Scale"
      value={selectedEstimation as string}
      onChange={HandleEstimationChange}
      // indicator={<KeyboardArrowDown />}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {estimationsArray.map((item, index) => (
        <MenuItem
          key={index}
          value={item.estimationName}

          // onChange={setSelectedEstimation(item.estimationName)}
        >
          {item.estimationName}
        </MenuItem>
      ))}
    </Select>
  );
};

export default EstimationScaleDropdown;
