import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

interface Props {
  title: string;
  author: string;
  description: string;
  imgUrl: string;
}

function Speech({ title, author, description, imgUrl }: Props) {
  const replaceBr = (text: string) => {
    if (text == undefined || text == null) return "";
    return text.replaceAll(/\n/g, "<br />");
  };

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={author}
        style={{ backgroundColor: "#fff", marginBottom: "-25px" }}
      />

      <CardContent>
        <Typography variant="body2" component="span">
          {imgUrl != null && imgUrl != undefined && imgUrl != "" ? (
            <div className="float-start m-2">
              <img className="rounded" src={imgUrl} />
            </div>
          ) : (
            ""
          )}
          <div
            dangerouslySetInnerHTML={{ __html: replaceBr(description) }}
          ></div>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Speech;
