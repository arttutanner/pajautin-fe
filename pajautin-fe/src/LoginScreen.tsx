import {
  Alert,
  Button,
  Card,
  CardContent,
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

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      // Get input value
      login(userId);
    }
    return true;
  };

  return (
    <Container>
      <h1></h1>
      <Card>
        <CardHeader title="Kirjaudu sisään" />
        <CardContent>
          <Stack>
            <TextField
              id="userLogin"
              label="Ilmoittautumistunnus"
              value={userId}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserId(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            {loginError ? <Alert severity="error">{loginError}</Alert> : ""}
            <Button
              id="login"
              variant="contained"
              style={{ marginTop: "10px" }}
              onClick={() => login(userId)}
            >
              Kirjaudu sisään
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginScreen;
