import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RobotPunksNFT.json';

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
        <div>
            <h1>RoboPunks</h1>
            <p>It's 2098. Can the RoboPunks NFT save humans from destructive rampant NFT speculation. Mint RoboPunks to find out.</p>
            {
                isConnected ? (
                    <div>
                        <div>
                            <button onClick={handleDecrement}>-</button>
                            <input type="number" value={mintAmount} readOnly />
                            <button onClick={handleIncrement}>+</button>  
                        </div>
                        <button onClick={handleMint}>Mint Now</button>
                    </div>
                ) : (
                    <p>You must be connected to mint.</p>
                )
            };
        </div>
    )
}

export default MainMint;