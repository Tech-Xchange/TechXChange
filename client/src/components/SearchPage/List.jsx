import React from "react";
import { Button, Container, Box } from '@mui/material/';
import ItemCard from "./ItemCard.jsx";
import { styled } from "@mui/system";
import axios, { all } from "axios";

const Box1 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  boxShadow: `-5px -5px 10px rgba(255,255,255,0.8),
  5px 5px 10px rgba(0,0,0,0.25)`,
  borderRadius: '30px',
  marginBottom: '35px',
  paddingBottom: '20px',
  width: '100%',

});

const Title = styled('div')({
  textAlign: 'center',
  fontSize: 'larger',
  marginTop: '10px'

})


export default function List({ changeView, condition }) {

  const [allItems, setAllItems] = React.useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:8080/devices')
      .then((response) => {
        setAllItems(response.data);

      }).catch((error) => {
        console.log(error);
      });

    //   axios.get('http://localhost:8080/users')
    //     .then((response) => {
    //       setAllUsers(response);
    //     }).catch((error) => {
    //       console.log(error);
    //     });
  }, []);


  return (allItems &&
    <Box1>
      <Title sx={{ color: '#505050', }}>Results</Title>
      {
        condition.length === 0
          ?
          allItems.map((item) => {
            return <ItemCard item={item} changeView={changeView} />
          })
          :
          allItems.map((item) => {
            return condition === item.item_condition && <ItemCard item={item} changeView={changeView} />
          })
      }
    </Box1>
  );
}

