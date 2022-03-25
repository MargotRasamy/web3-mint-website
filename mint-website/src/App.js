import './App.css';
import { useState } from 'react';
import MainMint from './MainMint';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([])

  return (
    <div className="App moving-background">
      <NavBar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
