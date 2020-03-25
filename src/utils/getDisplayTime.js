

const isToday = (someDate) => {
  const today = new Date();
  return someDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)
}

const isThisYear = (someDate) => {
  const today = new Date();
  return someDate.getFullYear() === today.getFullYear()
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
  } else if (isThisYear(date)) {
    return readable.slice(0, readable.lastIndexOf('/'));
  } else {
    return readable.slice(0, readable.indexOf(','));
  }
}

