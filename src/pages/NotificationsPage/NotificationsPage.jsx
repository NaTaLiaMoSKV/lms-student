import PageContainer from "components/PageContainer";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { gateDateTimeString } from "utils/dateUtils";
import {
  useGetNotificationsQuery,
  useSetNotificationViewedMutation,
} from "../../redux/notificationApi";
import { handleError } from "utils/handleError";
import { useState } from "react";
import { PiArrowClockwiseThin } from "react-icons/pi";
import PaginationBlock from "components/PaginationBlock";
import { useSelector } from "react-redux";
import { selectNotificationStat } from "../../redux/notificationStatSlice";
import Loader from "components/Loader";
import { TableStyled } from "styles/Table.styled";

const NotificationTableRow = ({ notification, handleView }) => {
  return (
    <tr
      onClick={() => handleView(notification)}
      className={notification.viewed ? "" : "fw-bold"}
      style={{ cursor: "pointer" }}
    >
      <td>{gateDateTimeString(notification.createdAt)}</td>
      <td
        style={{
          maxWidth: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "15px",
        }}
      >
        {notification.text}
      </td>
    </tr>
  );
};

const NotificationsTable = () => {
  const [page, setPage] = useState(1);

  const { pages } = useSelector(selectNotificationStat);

  const {
    data: notifications,
    refetch,
    isFetching,
    isLoading,
  } = useGetNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const [setViewed] = useSetNotificationViewedMutation();
  const navigate = useNavigate();

  const handleView = async ({ id, url }) => {
    try {
      await setViewed(id).unwrap();
      navigate(`../${url}`);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="m-4">
      {(isFetching || isLoading) && <Loader />}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <PaginationBlock page={page} setPage={setPage} pages={pages} />
        <Button
          className="border-0"
          variant="outline-secondary"
          onClick={refetch}
        >
          <PiArrowClockwiseThin />
        </Button>
      </div>
      {notifications && notifications.length > 0 && (
        <TableStyled hover>
          <thead>
            <tr>
              <th style={{ width: "220px" }}>Date</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <NotificationTableRow
                key={notification.id}
                notification={notification}
                handleView={handleView}
              />
            ))}
          </tbody>
        </TableStyled>
      )}
      {!notifications ||
        (notifications.length === 0 && (
          <h5 style={{ textAlign: "center", marginTop: "15px" }}>
            No notifications
          </h5>
        ))}
    </div>
  );
};

const NotificationsPage = () => (
  <PageContainer title="Notifications">
    <div className="mt-4">
      <NotificationsTable />
    </div>
  </PageContainer>
);

export default NotificationsPage;
