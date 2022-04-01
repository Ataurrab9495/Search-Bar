import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap'

function App() {
  const [value, setValue] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [load, setLoad] = useState(false);
 
  useEffect(() => {
    const getValue = async () => {
      try {
        setLoad(false)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response)
        const getData = response.data;
        setValue(getData);
        setLoad(true)
      }catch(e){
        setError(e)
      }
    }

    getValue();
  }, []);



 
  if (error) {
    return <div className='text-center'><h1>{error.message}</h1></div>
  } else {
    return (
      <>
        <Container className="d-flex flex-column mt-5" style={{ minHeight: "100vh" }}>
          <div className='w-100' style={{ maxWidth: "600px" }}>
            <div className='text-center'>
              <h1>Search</h1>
            </div>
            <Form.Control
              type="text"
              placeholder={load === true ? value[0].title : "search..."}
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={(event) => setQuery(event.target.value)}
            />

          </div>
          <div className='mt-3'>
            {value.filter((data) => {
              if (query === "") {
                return data;
              } else if (data.title.toLowerCase().includes(query.toLowerCase())) {
                return data;
              }
            }).map((item) => {
              return (
                <div key={item.id}>
                  {item.title}
                </div>
              )
            })}
          </div>

        </Container>


      </>
    );
  }
}

export default App;
