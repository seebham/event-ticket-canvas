import React from "react";
import maleTemplate from "./maleTemplate.png";

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
    img.src = maleTemplate;
    img.onload = () => {
      img.crossOrigin = "*";
      scaleToFill(img, ctx);
      let color = "#67fff4";
      ctx.font = "800 40px Roboto";
      ctx.fillStyle = color;
      ctx.textAlign = "left";
      let basey = 55;
      ctx.fillText(
        data.firstname.toUpperCase(),
        canvasRef.current.width / 12.6,
        canvasRef.current.height / 2 + basey
      );
      ctx.fillText(
        data.lastname.toUpperCase(),
        canvasRef.current.width / 12.6,
        canvasRef.current.height / 2 + basey + 35
      );
      basey += 35;
      ctx.font = "500 20px Roboto";
      ctx.fillStyle = "#eeeeee";
      ctx.fillText(
        data.subt,
        canvasRef.current.width / 12.6,
        canvasRef.current.height / 2 + basey + 25
      );
      basey = 50;
      data.events.map(function (el) {
        ctx.fillText(
          el,
          canvasRef.current.width - 218,
          canvasRef.current.height / 2 + basey
        );
        basey += 24;
        return true;
      });
    };
  }, [canvasRef, data]);
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const data = canvasRef.current.toDataURL("image/jpeg", 1.0);
    data.crossOrigin = "anonymous";
    var a = document.createElement("a");
    a.href = data;
    a.download = "compufestTicket.jpeg";
    document.body.appendChild(a);
    a.click();
  };
  return (
    <div className="canvasWrapper">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          border: "2px solid black"
        }}
      >
        Oh no, you're browser looks old. Upgrade to Chrome please!
      </canvas>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};
Ticket.defaultProps = {
  data: { firstname: "Firstname", lastname: "Lastname", subt: "Developer" }
};

export default Ticket;
