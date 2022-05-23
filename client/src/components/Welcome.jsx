import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constants";
import {
  useAccount,
  useContract,
  useBalance,
  useSigner,
  useSendTransaction,
  useWaitForTransaction,
  useContractEvent,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Divider, List, Snackbar } from "@mui/material";
import { FaEthereum } from "react-icons/fa";
import Loader from "./Loader";

const SendEthSchema = yup.object({
  address: yup
    .string("Recievers Address...")
    .required("Recievers Address is required"),

  amount: yup.number("Amount...").required("Amount is required"),

  keyword: yup.string("Keyword...").required("Keyword is required"),

  message: yup.string("Message...").required("Message is required"),
});

export default function Welcome() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hash, setHash] = useState("");

  const { data: account } = useAccount();
  const balance = useBalance({
    addressOrName: account?.address,
  });
  const signer = useSigner();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer?.data,
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      amount: "",
      keyword: "",
      message: "",
    },
    validationSchema: SendEthSchema,
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 500));
      let { address, amount, keyword, message } = values;
      amount = ethers.utils.parseEther(amount);
      if (values.amount) sendTransaction();
      await contract.addToBlockchain(address, amount._hex, keyword, message);
      setIsProcessing(true);
    },
  });

  const checkAmount = () => {
    let regex = new RegExp("\\s+");

    if (
      isNaN(formik.values.amount) ||
      isNaN(parseFloat(formik.values.amount)) ||
      formik.values.amount == "" ||
      regex.test(formik.values.amount)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const { data, isLoading, sendTransaction } = useSendTransaction({
    request: {
      to: formik.values.address,
      from: signer.address,
      value: checkAmount() ? ethers.utils.parseEther(formik.values.amount) : 0,
      gasPrice: "0x5208",
    },
    onSettled(data, error) {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setHash(data.hash);
      }
    },
  });

  // const waitForTnx = useWaitForTransaction({
  //   hash: hash,
  //   cacheTime: 1000,
  //   // wait: data?.wait,
  //   onSuccess(data) {
  //     console.log("Success: " + data);
  //     setIsSuccess(true);
  //     setHash("");
  //   },
  // });

  // useContractEvent(
  //   {
  //     addressOrName: contractAddress,
  //     abi: contractABI,
  //   },
  //   "Transfer",
  //   (event) => {
  //     console.log(event);
  //   }
  // );

  return (
    <div className="flex h-screen w-full justify-center items-center pb-20">
      <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col md:mr-10 sm:mt-10">
          <div className="text-3xl leading-relaxed md:text-6xl md:leading-snug py-1 text-white">
            <h1>
              Cryptocurrency মানেই <br />
            </h1>
            <h1 className="mt-3 font-bold">বঙ্গবন্ধু শেখ মুজিবুর রহমান</h1>
          </div>
          <p className="text-left mt-5 font-ligth md:w-9/12 w-11/12 text-base text-white mb-3">
            Sheikh Mujibur Rahman, often shortened as Sheikh Mujib or Mujib and
            widely known as Bangabandhu, was a Bangladeshi politician and
            statesman who is regarded as the Father of the Nation of Bangladesh
            BNP bad
          </p>
          <div className="flex justify-center md:justify-start items-start m-5">
            <ConnectButton showBalance={false} />
          </div>
        </div>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-slate-100 rounded-3xl">
          <div className="flex items-end">
            <FaEthereum fontSize={30} />
            <p className="font-bold">
              {balance?.data?.formatted.slice(0, 7)} {balance?.data?.symbol}
            </p>
          </div>
          <form onSubmit={formik.handleChange}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Recievers Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              margin="dense"
            />

            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              margin="dense"
            />

            <TextField
              fullWidth
              id="keyword"
              name="keyword"
              label="Keyword"
              value={formik.values.keyword}
              onChange={formik.handleChange}
              error={formik.touched.keyword && Boolean(formik.errors.keyword)}
              helperText={formik.touched.keyword && formik.errors.keyword}
              margin="dense"
            />

            <TextField
              fullWidth
              id="message"
              name="message"
              label="Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              margin="dense"
            />

            <List>
              <Divider />
            </List>

            {waitForTnx.isLoading ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={formik.handleSubmit}
                disabled={account === null ? true : false}
              >
                Send <FaEthereum />
              </Button>
            )}
          </form>
        </div>
      </div>
      <Snackbar
        open={isProcessing}
        autoHideDuration={6000}
        onClose={() => setIsProcessing(false)}
        message="Ropsten testnet 1-2 minute to mine. Have patience 🙂"
      />

      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
        message="Transaction Successful 💸"
      />
    </div>
  );
}
