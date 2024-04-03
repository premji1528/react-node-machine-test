
import { useContext, useState, useEffect } from "react";
import Box1 from "../components/box1";
import Box2 from "../components/box2";
import { SudentContext } from "../context/studentContext";
import axios from "axios";

const StudentList = () => {
    const context = useContext(SudentContext);

    const [selectedItems, setSelectedItems] = useState([])
    const [APIError, setAPIError] = useState(false)

    const loadUserListFromAPI = () => {
        axios({
            url: "http://localhost:3100/api/students/seed",
            method: "GET"
        }).then((response) => {
            if (response.data) {
                console.log('Seed data loaded to DB');
                getUserListFromAPI()
            }

        }).catch(() => {
            setAPIError(true);
        });
    }

    const getUserListFromAPI = () => {
        axios({
            url: "http://localhost:3100/api/students1",
            method: "GET"
        }).then((response) => context.setStudentList1(response?.data || [])).catch(() => {
            setAPIError(true);
        });

        axios({
            url: "http://localhost:3100/api/students2",
            method: "GET"
        }).then((response) => context.setStudentList2(response?.data || [])).catch(() => {
            setAPIError(true);
        });
    }

    useEffect(() => {
        getUserListFromAPI();
    }, [])

    const onHandleSelect = (id) => {
        let listItems = [...selectedItems];
        if (selectedItems.includes(id)) {
            listItems = selectedItems.filter((item) => item !== id)
        } else {
            listItems.push(id)
        }

        setSelectedItems([...listItems])
    }

    return (
        <div className='row'>
            <div className="fs-2 pb-2">Student List Application <h6>Do you want to load seed data, <a href="#" onClick={loadUserListFromAPI}>click here?</a></h6></div>
            {APIError && <h4 className="pb-3 text-danger"> There is an issue while communicating the server</h4>}
            <div className='col-5'>
                <div className='card p-4 h-100'>
                    <h5 className="card-title">Active Students</h5>
                    <Box1 studentList={context?.studentList1 || []} selectedItems={selectedItems || []} onHandleSelect={onHandleSelect} />
                </div>
            </div>
            <div className='col-2 d-flex justify-content-center align-items-center'>
                <button className='btn btn-primary' onClick={() => context.handleExchange(selectedItems)}> Exchange to Box 2 </button>
            </div>
            <div className='col-5'>
                <div className='card p-4 h-100'>
                    <h5 className="card-title">In Active Students</h5>
                    <div className='card-content'>
                        <Box2 studentList={context?.studentList2 || []} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StudentList;