export const ProflieReduser = (profile, action) => {
    
  switch (action.type) {
    case "ADD_PROFILE":
      localStorage.setItem('profile', JSON.stringify(action.payload));
      return { ...action.payload};

      case "LOGOUT":
        localStorage.setItem('profile', null);
        return null

    default:
      return profile;
  }
};
