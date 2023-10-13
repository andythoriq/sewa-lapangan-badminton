import React, { useEffect, useState } from "react";
import "./notif.css";
import axios from "../api/axios";
import { useNotification } from "../context/notificationContext";
function Notification({ swal }) {
  const { setNotifications, notifications, setUnreadCount, unreadCount } = useNotification()

  const [ isShow, setIsShow ] = useState(false);
  const [ triggerEffect, setTriggerEffect ] = useState(false)

  useEffect(() => {
    axios.get('/api/notification')
      .then(({ data }) => {
        setNotifications(data.notifications);
        setUnreadCount(data.total_unread)
      }).catch((e) => {
        swal.fire({ icon: "error", title: "Error!", html: "something went wrong", showConfirmButton: true, allowOutsideClick: false, allowEscapeKey: false });
      })
  }, [ triggerEffect ])

  const changeReadStatus = async (id) => {
    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/notification", { id: id });
      setTriggerEffect(!triggerEffect)
    } catch (e) {
      swal.fire({
        icon: "error",
        title: "Error!",
        html: "something went wrong",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  };
  return (<>
    <div key={1} className="icon" onClick={() => {
      setIsShow(!isShow)
      setTriggerEffect(!triggerEffect)
    }}>
      <img src="https://i.imgur.com/AC7dgLA.png" alt="" />
      <div className="count">{unreadCount}</div>
    </div>
    {isShow &&
      <div key={2} className="card notification-card">
        {notifications.map((item) => {
          return (<div key={item.id} className={`card-body my-0 py-3 notification-item ${item.read_status === "N" ? "unread" : ""}`}
            onClick={() => item.read_status === "N" ? changeReadStatus(item.id) : () => { }} >

            <h6 className="card-title">
              <strong>{item.label}</strong>{item.read_status === 'N' && <small className="text-secondary"> (click to read)</small>}
            </h6>
            <p className="card-text">
              <small><span dangerouslySetInnerHTML={{ __html: item.value.replace(/\n/g, '<br />') }} /></small>
            </p>
            <small className="text-secondary">{item.created_at}</small>
          </div>);
        })}
      </div>}
  </>);
}

export default Notification;
