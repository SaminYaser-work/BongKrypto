import { contractAddress, contractABI } from "../utils/constants";
import { useAccount, useContractRead } from "wagmi";
import { ethers } from "ethers";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Chip, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Transactions() {
  const { data: account } = useAccount();

  const getAllTransaction = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getAllTransaction"
  );

  const getTransactionCount = useContractRead(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "getTransactionCount"
  );

  return (
    <div className="flex flex-col w-full justify-center items-center bg-white pt-36">
      <h1 className="text-6xl">Transactions</h1>
      <div className="flex flex-col md:p-12 py-12 px-4">
        {account === null ? (
          <p>Account Not connected</p>
        ) : (
          <div>
            <p className="text-2xl flex justify-center items-center mb-5">
              {"Total Tnx Count: " +
                ethers.utils.formatUnits(getTransactionCount.data._hex, 0)}
            </p>

            <ThemeProvider theme={darkTheme}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {getAllTransaction.data.map((t) => (
                  <Card
                    key={t[4]}
                    variant="outlined"
                    sx={{ height: "300px", width: "200px", margin: "1rem" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="textSecondary"
                        gutterBottom
                      >
                        From: {t[0].slice(0, 5) + "..." + t[0].slice(-5)}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.primary"
                        gutterBottom
                      >
                        To: {t[1].slice(0, 5) + "..." + t[1].slice(-5)}
                      </Typography>
                      <Chip
                        label={t[3]}
                        variant="outlined"
                        sx={{ margin: "0.5rem" }}
                      />
                      <Typography color="textPrimary" gutterBottom>
                        Amount: {ethers.utils.formatEther(t[2])} ETH
                      </Typography>

                      <Box height={50}>
                        <Typography
                          color="textPrimary"
                          gutterBottom
                          textOverflow={"hidden"}
                        >
                          {t[5]}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained">
                        <a
                          target={"_blank"}
                          href={`https://ropsten.etherscan.io/address/${t[1]}`}
                        >
                          View on Etherscan.io
                        </a>
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
}
