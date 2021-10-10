
const footerStyle = {
  backgroundColor: "#212121",
  display: "flex",
  justifyContent: "space-evenly",
  // alignItems: "flex-start",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  // textAlign: "center",
  padding: "0px 20px 40px 20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%",
};

const phantomStyle = {
  display: "block",
  // padding: "20px",
  height: "60px",
  width: "100%",
};

export default function Footer({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>{children}</div>
    </div>
  );
}
