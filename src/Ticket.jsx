import React from "react";
import ticketImg from "./CompufestTicket.png";

const Ticket = ({ data }) => {
  const canvasRef = React.useRef();
  const scaleToFill = (img, ctx) => {
    let ctxCanvas = ctx.canvas;
    // get the scale
    var scale = Math.min(
      ctxCanvas.width / img.width,
      ctxCanvas.height / img.height
    );
    // get the top left position of the image
    var x = ctxCanvas.width / 2 - (img.width / 2) * scale;
    var y = ctxCanvas.height / 2 - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };
  React.useEffect(() => {
    if (!canvasRef.current) return;
    let ctx = canvasRef.current.getContext("2d");
    let img = new Image();
    img.src = ticketImg;
    img.onload = () => {
      scaleToFill(img, ctx);
      let color = "#67fff4";
      ctx.font = "900 40px Cantarell";
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      let basey = 55;
      ctx.fillText(
        data.firstname.toUpperCase(),
        canvasRef.current.width / 5,
        canvasRef.current.height / 2 + basey
      );
      ctx.fillText(
        data.lastname.toUpperCase(),
        canvasRef.current.width / 5,
        canvasRef.current.height / 2 + basey + 35
      );
      basey += 35;
      ctx.font = "500 15px Cantarell";
      ctx.fillStyle = "#eeeeee";
      ctx.fillText(
        data.subt,
        canvasRef.current.width / 5,
        canvasRef.current.height / 2 + basey + 25
      );
      basey = 50;
      data.events.map(function (el) {
        ctx.fillText(
          el,
          canvasRef.current.width - 155,
          canvasRef.current.height / 2 + basey
        );
        basey += 18;
        return true;
      });
    };
  }, [canvasRef, data]);
  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: "2px solid black" }}
    ></canvas>
  );
};
Ticket.defaultProps = {
  data: { firstname: "Firstname", lastname: "Lastname", subt: "Developer" }
};

export default Ticket;
