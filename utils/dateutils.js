module.exports = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const formattedDate = `${months[month]} ${day} ${year}`;
  
    return formattedDate;
};