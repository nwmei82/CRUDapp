import axios from "axios";
import { useState } from "react";

const Table = ({handleIsopen, searchTerm,tableData,setTabledata}) => {
    const [error, setError] = useState(null);


    const filteredData = tableData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/clients/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };

    return(
        <>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="px-[60px] pt-[20px]">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>Rate</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                {}
                <tbody className="hover">
                {filteredData.map((client)=> {
                    return(
                    <tr key={client.id}>
                    <th>{client.id}</th>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.job}</td>
                    <td>{client.rate}</td>
                    <td>
                        <button className={`btn rounded-full w-20 ${client.isActive ? `btn-primary` : `btn-outline-primary`}`}>{client.isActive? 'Active' : 'Inactive'}</button>
                    </td>
                    <td><button className="btn btn-ghost" onClick={()=> handleIsopen("edit",client)}><i class="fi fi-rr-edit"></i></button></td>
                    <td><button className="btn btn-ghost" onClick={()=> handleDelete(client.id)}><i class="fi fi-rr-trash"></i></button></td>
                    </tr>
                )})}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Table;