import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  login: (userId: string) => void;
  loginError: string;
}

function LoginScreen({ login, loginError }: Props) {
  const [userId, setUserId] = useState<string>("");

  //add above return
  useEffect(() => {
    let url = window.location.href;
    if (url.includes("?")) {
      setUserId(url.split("?")[1]);
    }
  });

  return (
    <Container>
      <h1></h1>
      <Card>
        <CardHeader title="Kirjaudu sisään" />
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
      </Card>
    </Container>
  );
}

export default LoginScreen;
