import React from 'react';
import * as API from '../../API.js';
import Trade from './Trade.jsx';

import { Box, Switch, Grid } from '@mui/material/';
import {styled} from '@mui/system'
import RefreshIcon from '@mui/icons-material/Refresh';

const Box1 = styled('div')({
  backgroundColor: '#CAF0F8',
  alignContent: 'center',
  flexWrap: 'wrap',
  display: 'flex',
  flexDirection: 'column' ,
  justifyContent: 'flex-start',
  boxShadow: `-5px -5px 10px rgba(255,255,255,0.8),
  5px 5px 10px rgba(0,0,0,0.25)`,
  borderRadius: '30px',
  marginBottom: '20px',
  height: '25vh',
  width: '100%',
});


function PendingTrades({userData}) {
// userData { id, email, password, thumnail_url, description, street, zip_code }
const [yourTrades, setYourTrades] = React.useState([]);
const [yourOffers, setYourOffers] = React.useState([]);
const [shownTrades, setShownTrades] = React.useState([]);
const [currentType, setCurrentType] = React.useState('trade'); //or OFFER
const [typeHTML, setTypeHTML] = React.useState('Showing Your Trades'); //or OFFER
// const [tradeStyle, setTradeStyle] = React.useState([{display: 'block'},{display: 'none'}]); //or OFFER

React.useEffect(() => { //set HTML span for TYPE
  var typeText = currentType === 'trade' ? 'Showing Your Trades' : 'Showing Your Offers';
  setTypeHTML(typeText);
}, [currentType]);


React.useEffect(() => { //sets Trades
  if(userData.id) {
    getSetTrades();
  }
}, [userData])

React.useEffect(() => { //sets Trades
  if(yourTrades.length && yourOffers.length) {
    if(currentType === 'trade' && yourTrades.length) {
      setShownTrades(yourTrades);
      // console.log('updated shown trades with, ', yourTrades);
    } else if(currentType === 'offer' && yourOffers.length) {
      setShownTrades(yourOffers);
    }
  }
}, [yourTrades, yourOffers, currentType])


//First
const getSetTrades = () => {
API.getAllInvolvedTrades(userData.id)
.then(res => {
  var tempTrades = [];
  var tempOffers = [];
  var errTrades = [];
  res.data.forEach((trade, i) => {
    if(trade.proposer_id === userData.id) {
      tempTrades.push(trade);
    } else if(trade.receiver_id === userData.id) {
      tempOffers.push(trade);
    } else {
      errTrades.push(trade);
    }
  }); //end forEach
  setYourTrades(tempTrades);
  setYourOffers(tempOffers);
  // console.log('Trades\n', tempTrades);
  // console.log('Offers\n', tempOffers);
  if(errTrades.length) {console.log('error trades involved', errTrades)}
}) //Involved Trades set
.catch(err => {
  console.error('ERR in getAllInvolvedTrades', err);
})
};

const toggleTrade = () => {
  // console.log('toggling trade type');
  var type = currentType === 'trade' ? 'offer' : 'trade';
  setCurrentType(type);
  // setTradeStyle([tradeStyle[1], tradeStyle[0]]);
}


  return (
    <div id='trades'>
      <div className='trade-header'>
        <span className="toggle-text">
          <Switch defaultChecked onClick={e => {toggleTrade()}} />
          <span>{typeHTML}</span>
        </span>
        <RefreshIcon fontSize='inherit' onClick={e => {getSetTrades()}} className="refresh-trades"/>
      </div>
      <div className='trade-list'>
        {shownTrades.map(trade => {
          return <Trade key={trade.id} type={currentType} yourData={userData} trade={trade}/>
        })}
      </div>
      {/* <Grid container columns={{ xs: 1 }}  style={tradeStyle[0]} className='trade-list'>
      </Grid>
      <Grid container columns={{ xs: 1 }}  style={tradeStyle[1]} className='offer-list'>
      </Grid> */}

    </div>
  );
}
export default PendingTrades;
