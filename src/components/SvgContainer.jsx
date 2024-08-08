import blobBlue from "../assets/blob1.svg";
import blobYellow from "../assets/blob2.svg";

function SvgContainer() {
  return (
    <div className="svg-container">
      <img
        className="blue-blob blob"
        src={blobBlue}
        alt=""
      />
      <img
        className="yellow-blob blob"
        src={blobYellow}
        alt=""
      />
    </div>
  );
}

export default SvgContainer;
