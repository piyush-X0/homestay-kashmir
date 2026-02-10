import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Refund Policy</h1>
      <div style={styles.section} className="fade-in">
        <h2 style={styles.subHeading}>For Booking:</h2>
        <p style={styles.text}>
          For the Homestay services from <strong>homestaykashmir.com</strong>,
          15% payment should be made at least before 15 days of your arrival for
          confirm booking.
        </p>
        <p style={styles.text}>
          For the Multi-day Experience (Tour) services from{" "}
          <strong>homestaykashmir.com</strong>, at least 50% payment of total
          amount should be made at least 7 days before your arrival for
          confirmed booking. Remaining 35% balance amount should be fully paid
          on the day of arrival.
        </p>
      </div>
      <div style={styles.section} className="fade-in">
        <h2 style={styles.subHeading}>Mode of Payment:</h2>
        <p style={styles.text}>
          Overseas advance payment can be made only through{" "}
          <strong>CCAvenue</strong> using credit card. Domestic payments can be
          made only through – <strong>CCAvenue link</strong>, Net Banking, Debit
          Card, Credit Card, or UPI. <strong>No Cash payments</strong> are
          allowed at the home stays booked through <strong>homestaykashmir.com</strong>.
        </p>
        <p style={styles.text}>
          10% advance must be submitted at the time of the booking to confirm
          your reservation through <strong>homestaykashmir.com</strong>.
        </p>
      </div>
      <div style={styles.section} className="fade-in">
        <h2 style={styles.subHeading}>Cancellation Policy:</h2>
        <p style={styles.text}>
          In the event of cancellation of booking through{" "}
          <strong>homestaykashmir.com</strong> services due to any avoidable or
          unavoidable reasons, we must be notified of the same in writing.
          Cancellation charges will be effective from the date we receive
          advice in writing, and charges are as follows:
        </p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <strong>For homestays:</strong>
          </li>
          <li style={styles.listItem}>
            100% refund if cancellation is made before 7 days prior to arrival.
          </li>
          <li style={styles.listItem}>
            No refund if cancellation is made within 7 days of arrival date.
          </li>
          <li style={styles.listItem}>
            50% refund in case of bad health with a valid prescription.
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    margin: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    animation: "fadeIn 1.5s ease-in-out",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    textAlign: "center" as const,
    marginBottom: "20px",
    animation: "fadeInDown 1s ease-in-out",
  },
  subHeading: {
    fontSize: "1.8rem",
    color: "#34495e",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1rem",
    color: "#7f8c8d",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  list: {
    listStyleType: "disc" as const,
    paddingLeft: "20px",
    color: "#7f8c8d",
  },
  listItem: {
    fontSize: "1rem",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "30px",
  },
};

export default RefundPolicy;
