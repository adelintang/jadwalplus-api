const filteredSchedules = (value) => value.reduce((acc, curr) => {
  acc.push({
    id: curr.id,
    schedule: curr.schedule,
    dateTime: curr.dateTime,
    finished: curr.finished,
    createdAt: curr.createdAt,
  });
  return acc;
}, []);

export default filteredSchedules;
