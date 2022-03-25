import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RobotPunksNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = '0x13a2287bC523A67fe8De03490Da162D4A9b83CB9';

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('err ', err);
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">

                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
                    <Text fontSize="30px"
                    textShadow="0 2px 2px #000000"
                    fontFamily="VT323"
                    letterSpacing="-5.5%">It's 2098. Can the RoboPunks 
                    NFT save humans from destructive
                    rampant NFT speculation.
                    Mint RoboPunks to find out.</Text>
                </div>
                
                {
                    isConnected ? (
                        <div>
                            <Flex justify="center" align="center">
                                <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}>-</Button>
                                <Input
                                width="100px"
                                height="40px"
                                textAlign="center"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                fontFamily="inherit"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number" value={mintAmount} readOnly />
                                <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}>+</Button>
                            </Flex>
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleMint}>Mint Now</Button>
                        </div>
                    ) : (
                        <Text fontSize="30px"
                            color="#D6517D"
                            textShadow="0 2px 2px #000000"
                            fontFamily="VT323"
                            letterSpacing="-5.5%">You must be connected to mint.
                        </Text>
                    )
                }
            </Box>
        </Flex>
    )
}

export default MainMint;