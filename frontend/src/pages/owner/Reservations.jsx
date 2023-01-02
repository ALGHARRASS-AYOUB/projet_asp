import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReservationsTable from "../../components/tables/ReservationsTable";
import { useReservation } from "../../Context/ReservationContext";
function Reservations() {
  const { getOwnerReservations } = useReservation();
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [reservationList, setReservationList] = useState([]);
  const fetchData = async () => {
    const data = await getOwnerReservations(userInfo.id,userInfo.token);
    setReservationList(data);
    console.log(reservationList.data);
  };
  useEffect(() => {
    if (userInfo != null && userInfo.role == "proprietaire") {
      fetchData();
    }
  }, [localStorage.getItem("userInfo")]);
  return (
    <>
      <Row className="mb-4">
        <Col md="6">
          <label className="mb-1">Find Reservation By Date</label>
          <Form.Control type="date" />
        </Col>
        <Col md="6">
          <label className="mb-1">Search Reservation</label>
          <Form.Control
            placeholder="Search Offer"
            aria-label="Search Reservation"
            aria-describedby="basic-addon2"
          />
        </Col>
      </Row>
      <ReservationsTable data={reservationList} />
    </>
  );
}
export default Reservations;
