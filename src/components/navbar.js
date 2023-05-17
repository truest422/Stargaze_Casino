import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSigningClient } from '../contexts/cosmwasm'

export default function Navbar() {
  const navigate = useNavigate();
  
  const { 
    walletAddress, 
    connectWallet, 
    signingClient, 
    disconnect, 
    loading,
    getConfig,
    isAdmin,
    getBalances,
    nativeBalance,
    nativeBalanceStr,
  } = useSigningClient()

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false)
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let account = localStorage.getItem("address")
    if (account != null) {
      connectWallet(true)
    }
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0)
      return
    getConfig()
    getBalances()
  }, [walletAddress, signingClient])

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: { xs: "60px", sm: "80px", md: "150px" },
          backgroundColor: "#FFC700",
          padding: { xs: "0 10px", sm: "0 20px" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: "1",
          "& .MuiBox-root": {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            "& img": {
              height: { xs: "36px", sm: "42px", md: "90px" },
            },
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img alt="" src="./logo192.png" />
          <Typography
            sx={{
              display: { xs: "none", sm: "flex" },
              fontSize: { sm: "24px", md: "40px" },
              fontWeight: "400",
              color: "white",
            }}
          >
            STARPS
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px", md: "32px" },
              fontWeight: "600",
              color: "black",
            }}
          >
            {nativeBalanceStr}
          </Typography>
          {/* <Box
            sx={{
              marginLeft: { xs: "10px", sm: "20px", md: "30px" },
              "& .wallet-adapter-button": {
                width: { xs: "140px", sm: "180px", md: "285px" },
                height: { xs: "42px", sm: "48px", md: "65px" },
                borderRadius: "10px",
                background: "black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                color: "white",
                fontSize: { xs: "14px", sm: "18px", md: "25px" },
                fontWeight: "600",
              },
            }}
          >
            <WalletMultiButton />
          </Box> */}
          <Button
            sx={{
              width: "290px",
              height: "65px",
              marginLeft: "36px",
              borderRadius: "10px",
              background: "black",
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
              textTransform: "none",
              "&:hover": {
                background: "black",
              },
            }}
            onClick={handleConnect}
          >
            {walletAddress ? walletAddress.substring(0,12) + "..." + walletAddress.substring(walletAddress.length - 6, walletAddress.length) :'Connect Wallet'}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          width: { xs: "100px", md: "154px" },
          height: { xs: "42px", md: "64px" },
          borderRadius: "10px",
          left: { xs: "10px", md: "36px" },
          bottom: "20px",
          backgroundColor: "#FFC700",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .MuiIconButton-root": {
            width: { xs: "42px", md: "64px" },
            aspectRatio: "1",
            backgroundSize: "cover",
          },
        }}
      >
        <IconButton
          sx={{
            background: "url(./images/twitter.png)",
          }}
        />
        <IconButton
          sx={{
            marginLeft: "5px",
            background: "url(./images/discord.png)",
          }}
        />
      </Box>
      <Button
        sx={{
          position: "fixed",
          width: { xs: "120px", md: "220px" },
          height: { xs: "42px", md: "65px" },
          right: { xs: "10px", md: "36px" },
          bottom: "20px",
          borderRadius: "10px",
          border: "5px solid #FFC700",
          fontSize: { xs: "14px", md: "25px" },
          fontWeight: "600",
          color: "black",
          textTransform: "none",
          zIndex: "1",
        }}
      >
        Rules
      </Button>
    </>
  );
}