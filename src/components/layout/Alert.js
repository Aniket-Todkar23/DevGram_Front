import React from "react";
import { useSelector } from "react-redux";
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  const alertStyles = {
    base: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      marginTop: "10px",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "500",
      minWidth: "280px",
      backdropFilter: "blur(12px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      animation: "slideUp 0.4s ease",
      color: "white",
    },
    success: {
      background: "rgba(34,197,94,0.2)",
      border: "1px solid rgba(34,197,94,0.4)",
      color: "#86efac",
    },
    error: {
      background: "rgba(239,68,68,0.2)",
      border: "1px solid rgba(239,68,68,0.4)",
      color: "#fca5a5",
    },
    warning: {
      background: "rgba(250,204,21,0.2)",
      border: "1px solid rgba(250,204,21,0.4)",
      color: "#fde047",
    },
    info: {
      background: "rgba(59,130,246,0.2)",
      border: "1px solid rgba(59,130,246,0.4)",
      color: "#93c5fd",
    },
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={18} />;
      case "danger":
      case "error":
        return <XCircle size={18} />;
      case "warning":
        return <AlertCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .alert-container {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>

      <div className="alert-container">
        {alerts.length > 0 &&
          alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                ...alertStyles.base,
                ...(alertStyles[alert.alertType] || alertStyles.info),
              }}
            >
              {getIcon(alert.alertType)}
              <span>{alert.msg}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Alert;
