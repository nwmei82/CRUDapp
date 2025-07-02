import { useState,useEffect } from "react";
import Navbar from "./component/navbar";
import Table from "./component/table";
import Form from "./component/form";
import axios from "axios";

function App() {
  const [isOpen, setIsopen] = useState(false);
  const [modalMode, setModalmode] = useState("add");
  const [searchTerm, setSearch] = useState("");
  const [clientData, setClientdata] = useState(null);
  const [tableData, setTabledata] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clients')
      setTabledata(response.data);
      console.log(response);
    } catch (err){
      setError(err.massage);
    }
  }

  useEffect(() => {
    fetchData();
  },[]);
  
  const handleIsopen = (mode,client) => {
    setClientdata(client)
    setIsopen(true);
    setModalmode(mode);
  }

  const fetchClients = async () => {
        try {
          const response  = await axios.get('http://localhost:5000/api/clients')
          setTabledata(response.data); // Set the fetched data

        } catch (err) {
            setError(err.message);
        }
    };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:5000/api/clients', newClientData); // Replace with your actual API URL
        console.log('Client added:', response.data); // Log the response
        setTabledata((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added client
        } catch (error) {
            console.error('Error adding client:', error); // Log any errors
        }
      console.log('modal mode Add');

    } else {
      console.log('Updating client with ID:', clientData.id);
      try {
        const response = await axios.put(`http://localhost:5000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
        setTabledata((prevData) =>
        prevData.map((client) => (client.id === clientData.id ? response.data : client))
        );
      } catch (error) {
        console.error('Error updating client:', error); 
      }
    }

  }

  return (
    <>
      <Navbar onOpen={()=> handleIsopen("add")} onSearch={setSearch}/>
      <Table handleIsopen={handleIsopen} searchTerm={searchTerm} setTabledata={setTabledata} tableData={tableData}/>
      <Form isOpen={isOpen} OnSubmit={handleSubmit} onClose={()=> setIsopen(false)} mode={modalMode} clientData={clientData}/>
    </>
  )
}

export default App
