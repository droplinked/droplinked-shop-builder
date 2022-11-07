import { chakra } from "@chakra-ui/react";

export const CollectionPageWrapper = chakra("div", {
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100% ",
  },
});


export const ButtonWrapper = chakra("div", {
  baseStyle: {
    mt:'48px' , 
    w:{base:'100%', md:'25%'},
    minW:'300px'
  },
});

export const AddproductWrapper = chakra("div", {
  baseStyle: {
    mt:'48px' , 
    w:{base:'100%',sm:'100%', md:'100%'},
  },
});


export const HeaderTitle = chakra("p", {
  baseStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: "40px",
  },
});

export const ListedNumber = chakra("p", {
  baseStyle: {
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
  },
});

// .Collection-page-wrapper {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width:100%;
//     min-width: 100%;
//     & .ims-title {
//       color: #fff;
//       font-weight: 600;
//       font-size: 40px;
//     }

//     & .number-of-merchs {
//       margin-top: 0px;
//       color: #fff;
//       font-weight: 500;
//       font-size: 14px;
//     }

//     & .no-product{
//       margin-top: 40px;
//       color: #fff;
//       font-weight: 600;
//       font-size: 30px;
//     }

//     & .no-collection-text{
//       margin-top: 20px;
//       color: #fff;
//       font-weight: 600;
//       font-size: 30px;
//       text-align: center;
//     }
//   }

//   @media only screen and (max-width: 768px) {
//     .Collection-page-wrapper {
//     //  margin:0px 20px;

//       & .no-collection-text{
//         font-size: 20px;
//       }
//     }
//   }
