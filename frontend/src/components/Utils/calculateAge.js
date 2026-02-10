export const calculateAge = (dateString) => {
 
    const [year, month, day] = dateString.split('-').map(Number);   
    const birthDate = new Date(year, month - 1, day);   
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    
    const isBeforeBirthdayThisYear = 
      today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
    
    if (isBeforeBirthdayThisYear) {
      age--;
    }
    
    return age;
  }
  