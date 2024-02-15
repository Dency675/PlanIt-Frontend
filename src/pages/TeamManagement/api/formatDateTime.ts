const formatDateTime = (time: string | Date) => {
  const dateTime = new Date(time);
  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formattedDate: string = dateTime
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const formattedTime: string = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const amPm: string = dateTime
    .toLocaleString("en-US", { hour: "numeric", hour12: true })
    .split(" ")[1];

  const today: number = new Date().setHours(0, 0, 0, 0);

  const tomorrow: number = new Date().setDate(new Date().getDate() + 1);
  new Date(tomorrow).setHours(0, 0, 0, 0);

  let dayString: string;
  if (dateTime.getTime() > tomorrow) {
    dayString = dayNames[dateTime.getDay()];
  } else if (dateTime.getTime() > today) {
    dayString = "Today";
  } else if (dateTime.getTime() > today - 7 * 24 * 60 * 60 * 1000) {
    dayString = "Yesterday";
  } else if (dateTime.getTime() < today - 7 * 24 * 60 * 60 * 1000) {
    dayString = "Tomorrow";
  } else {
    dayString = dayNames[dateTime.getDay()];
  }

  return `${formattedTime} ${formattedDate} ${dayString} `;
};

export { formatDateTime };
