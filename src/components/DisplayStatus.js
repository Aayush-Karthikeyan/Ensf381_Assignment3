function DisplayStatus({ type, message }) {
  const color = type === "success" ? "green" : "red";

  return (
    <div style={{ color: color, fontWeight: "bold", marginTop: "10px" }}>
      {message}
    </div>
  );
}

export default DisplayStatus;
