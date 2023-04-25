// validation emails

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};


export const emailPattern = /\S+@\S+\.\S+/