// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PocketBase from 'pocketbase';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react';


function App() {
  const [err, setErr] = useState(undefined)
  const pb = new PocketBase('https://api.despain.casa');
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    await pb.collection('files').create({file:files[0]})
    .then(data => (console.log("success!")))
    .catch(err => {
      console.log(err.status, err.name, err.response)
      setErr(err)
  })
}

  return (
    // <div className="App">
      <Container className='d-flex align-items-center justify-content-center vh-100' >
        <Card className='justify-content-center align-items-center'>
        <Card.Body>
        <Container>
        <Form>
          <Form.Group>
            <Col>
            <Row className='my-auto'>
            <Form.Label className= '' htmlFor='fileInput'>Upload your STL!</Form.Label>
            </Row>
            <Row>
            <Form.Control className='' type='file' onChange={handleFileUpload} />
            </Row>
            </Col>
          </Form.Group>
        </Form>
        </Container>
        </Card.Body>
        </Card>
        {err? (<Row><Alert variant="danger">{err.status + ' ' + err.name}</Alert></Row>):null}
      </Container>
    // </div>
  );
}

export default App;
