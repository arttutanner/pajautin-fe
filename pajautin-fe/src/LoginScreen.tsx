import { Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "react-bootstrap";

interface Props {
  login: (userId: string) => void;
  loginError: string;
}

function LoginScreen({ login, loginError }: Props) {
  const [userId, setUserId] = useState<string>("");

  return (
    <Container>
      <h3>Kirjaudu sisään</h3>
      <Stack>
        <TextField
          id="userLogin"
          label="Ilmoittautumistunnus"
          value={userId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserId(event.target.value);
          }}
        />
        <Button id="login" onClick={() => login(userId)}>
          Kirjaudu sisään
        </Button>
      </Stack>
    </Container>
  );
}

export default LoginScreen;
