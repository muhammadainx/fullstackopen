const Notification = ({ notification }) => {
  if (!notification) return null;

  const className = notification.status === "error" ? "error" : "success";

  const style = {
    color: notification.status === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className={className} style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
