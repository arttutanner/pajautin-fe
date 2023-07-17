import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PAJAUTIN_READ_ONLY, THEME_COLORS } from "./types/Constants";

interface Props {
  login: (userId: string) => void;
  loginViewOnly: () => void;
  loginError: string;
}

function LoginScreen({ login, loginViewOnly, loginError }: Props) {
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
    <Container style={{ marginTop: "70px" }}>
      <Card>
        <CardHeader title="Tervetuloa Pajauttimeen!" />
        <CardContent>
          Pajautin on Johtajatulien työkalu, jonka avulla voit valita
          ohjelmatoiveesi. Tarkemmat ohjeet ohjelmatoiveiden valintaan löydät{" "}
          <Link
            href="https://johtajatulet.fi/seminaariohjelma/"
            target="_blank"
            rel="nopener"
          >
            täältä.
          </Link>
          {PAJAUTIN_READ_ONLY ? (
            <p style={{ color: "#ed672c", fontWeight: "bold" }}>
              <br />
              Ohjelmavalinta on nyt sulkeutunut. Voit katsoa tekemiäsi valintoja
              Pajauttimesta, mutta et muuttaa niitä.
              <br /> Lopullisen Johtajatulien aikataulusi näät Pajauttimesta
              elokuun alkuun mennessä.
            </p>
          ) : (
            ""
          )}
        </CardContent>
      </Card>

      <Card style={{ marginTop: "20px" }}>
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
              style={{
                marginTop: "10px",
                backgroundColor: THEME_COLORS.LIESKA[100],
              }}
              onClick={() => login(userId)}
            >
              Kirjaudu sisään
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card style={{ marginTop: "20px" }}>
        <CardHeader title="Katsele ilman kirjautumista" />
        <CardContent>
          <Stack>
            Tästä pääset katselemaan Johtajatulien ohjelmasisältöjä ilman
            kirjautumista.
            <Button
              variant="contained"
              style={{
                marginTop: "10px",
                backgroundColor: THEME_COLORS.METSALAMPI[100],
              }}
              onClick={loginViewOnly}
            >
              Jatka ilman kirjautumista
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginScreen;
