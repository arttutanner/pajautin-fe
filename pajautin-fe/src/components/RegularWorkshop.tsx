import { Link, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Workshop } from "../types/Workshop";

interface Props {
  item: Workshop;
}

function RegularWorkshop({ item }: Props) {
  const replaceBr = (text: string) => {
    if (text == undefined || text == null) return "";
    return text.replaceAll(/\n/g, "<br />");
  };

  return (
    <CardContent>
      <Typography variant="body2">
        {item.imgUrl != null &&
        item.imgUrl != undefined &&
        item.imgUrl != "" ? (
          <div className="float-start m-2">
            <img className="rounded" src={item.imgUrl} />
          </div>
        ) : (
          ""
        )}
        <div
          dangerouslySetInnerHTML={{ __html: replaceBr(item.description) }}
        ></div>

        {item.link != null && item.link != undefined && item.link.length > 0
          ? item.link.split(",").map((link) => (
              <div>
                <Link
                  key={link.trim()}
                  href={link.trim()}
                  target="_blank"
                  rel="nopener"
                >
                  {link.trim()}
                </Link>
                <br />
              </div>
            ))
          : ""}
      </Typography>
    </CardContent>
  );
}

export default RegularWorkshop;
