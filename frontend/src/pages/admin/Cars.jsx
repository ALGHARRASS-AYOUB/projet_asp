import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CarsTable from '../../components/tables/CarsTable';
import { useCar } from '../../Context/CarContext';

function Cars() {
  const navigate = useNavigate('');
  const { getCars } = useCar('');
  const [cars, setCars] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo')),
  );
  const [filtredData, setFiltredData] = useState([]);

  const fetchData = async () => {
    const voitures = await getCars();
    setCars(voitures.value);
    setFiltredData(voitures.value);
  };
  const updateTable = (v=null,searchKey=null) => {
    if (searchKey == null && v != null) {
      switch (v) {
        case 'true':
          const data = cars.filter(item => {
            return item.isAprouved;
          });
          setFiltredData(data);
          console.log(data);
          break;
        case 'false':
          setFiltredData(
            cars.filter(item => {
              return item.isAprouved == false;
            }),
          );
          break;
        case 'all':
          setFiltredData(cars);
          break;
        default:
          break;
      }
    }

    if (searchKey != null && v == null) {
      const data = cars.filter(item => {
        return item.name.toLowerCase().search(searchKey.toLowerCase()) != -1;
      });
      console.log(data);
      setFiltredData(data);
    }
  };
  useEffect(() => {
    if (userInfo != null) {
      fetchData();
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    } else {
      return navigate('/login');
    }
  }, [localStorage.getItem('userInfo')]);

  return (
    <>
      <Row className='mb-4'>
        <Col md='6'>
          <Form.Select onChange={e => updateTable(e.target.value)}>
            <option value={'all'}>All</option>
            <option value={true}>Approuved</option>
            <option value={false}>Not Approuved</option>
          </Form.Select>
        </Col>
        <Col md='6'>
          <Form.Control
            placeholder='Search Car'
            aria-label='Search Car'
            aria-describedby='basic-addon2'
            onChange={e => updateTable(null, e.target.value)}
          />
        </Col>
      </Row>
      <CarsTable type='admin' data={filtredData} setVoitures={setCars} />
    </>
  );
}
export default Cars;
