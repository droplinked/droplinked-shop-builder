export const ProflieReduser = (profile, action) => {
    console.log(profile);
    switch (action.type) {

        case "ADD_PROFILE":
            // console.log("state");
            // console.log(profile);
            return {...profile}

        
        default:
            return profile

    }
}