import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../../components/navbar";

import { useSigningClient } from '../../contexts/cosmwasm'

import dayjs from 'dayjs'

function Home() {
  const navigate = useNavigate();

  const [playHistory, setPlayHistory] = useState([]);

  var relativeTime = require('dayjs/plugin/relativeTime')
  dayjs.extend(relativeTime)

  const { 
    walletAddress,
    signingClient,
    getDiceHistory,
    DicehistoryList

  } = useSigningClient()

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {      
      setPlayHistory(null)
      return
    }
    
    getDiceHistory();
  }, [signingClient, walletAddress])

  useEffect(() => {
    if (DicehistoryList === null) {
      return
    }
    setPlayHistory(DicehistoryList)
  }, [DicehistoryList])

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: { xs: "60px", sm: "80px", md: "150px" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "42px", md: "64px" },
            lineHeight: { xs: "36px", sm: "58px", md: "77px" },
            fontWeight: "700",
            color: "black",
            textAlign: "center",
            marginTop: { xs: "36px", sm: "42px", md: "90px" },
          }}
        >
          DICE
          <br />
          YOUR WAY TO RICHES!
        </Typography>
        <Button
          sx={{
            width: { xs: "160px", sm: "240px", md: "275px" },
            height: { xs: "42px", sm: "64px", md: "75px" },
            borderRadius: "20px",
            background: "#FFC700",
            fontSize: { xs: "16px", sm: "28px", md: "36px" },
            fontWeight: "700",
            color: "black",
            marginTop: { xs: "15px", sm: "20px", md: "30px" },
            "&:hover": {
              background: "#FFC700",
            },
          }}
          onClick={() => {
            navigate("/dice_play");
          }}
        >
          Play
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: { xs: "30px", sm: "50px", md: "80px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "24px", md: "28px" },
              fontWeight: "400",
              color: "black",
            }}
          >
            RECENT PLAYS
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "750px",
              background: "#F5F5F5",
              padding: { xs: "0 10px", sm: "10px 25px", md: "20px 40px" },
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >
            {playHistory?.length > 0 &&
              playHistory.map((item) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      "& .MuiTypography-root": {
                        fontSize: { xs: "11px", sm: "12px", md: "18px" },
                        fontWeight: "400",
                        marginRight: "10px",
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#FFC700",
                        textTransform: "lowercase!important",
                        textAlign:"center",
                      }}
                    >
                      {item.address.substring(0,12) + "..." + item.address.substring(item.address.length - 6, item.address.length)}
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "black",
                        textAlign:"center",
                      }}
                    >
                      PLAYED {item.level === 0 ? 'ODD' : 'EVEN'} FOR
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: "flex", sm: "none" },
                        color: "black",
                      }}
                    >
                      {item.level === 0 ? 'ODD' : 'EVEN'}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFC700",
                        textAlign:"center",
                      }}
                    >
                      {parseInt(item.bet_amount)/1000000} STARS
                    </Typography>
                    <Typography
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "black",
                        textAlign:"center",
                      }}
                    >
                      AND
                    </Typography>
                    <Typography
                      sx={{
                        color: item.win === 0 ? "#1CC700" : "#FF0000",
                        textAlign:"center",
                      }}
                    >
                      {item.win === 0 ? "WON" : "LOST"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      fontWeight: "400",
                      fontSize: { xs: "10px", sm: "12px", md: "16px" },
                      color: "black",
                      marginLeft: "20px",
                      textAlign:"center",
                    }}
                  >
                    { dayjs().to(dayjs(dayjs.unix(item.timestamp))) }
                  </Typography>
                  <Typography
                    sx={{
                      display: { xs: "flex", sm: "none" },
                      fontWeight: "400",
                      fontSize: { xs: "10px", sm: "12px", md: "16px" },
                      color: "black",
                      marginLeft: "20px",
                      textAlign:"center",
                    }}
                  >
                    { dayjs().to(dayjs(dayjs.unix(item.timestamp))) }
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Home;
