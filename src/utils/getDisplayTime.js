

const isToday = (someDate) => {
  const today = new Date();
  return someDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)
}


export const getDisplayTime = (time) => {
  const date = new Date(time);
  const readable = date.toLocaleString();
  if (isToday(date)){
    const timeHours = readable.slice(readable.indexOf(',') + 2, readable.length);
    return `
      ${timeHours.slice(0, timeHours.lastIndexOf(':'))}${
        timeHours.slice(
        timeHours.lastIndexOf(' '),
        timeHours.length)
      }
    `;
  } else {
    return readable.slice(0, readable.lastIndexOf('/'));
  }
}

