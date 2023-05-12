import "./App.css";
import { Button } from "./components/button/Button";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary"/>
      <Button variant="secondary"/>
      <Button variant="success"/>
      <Button variant="danger"/>
      <Button />

      <GlobalStyle />
    </ThemeProvider>
    
  );
}

export default App;
