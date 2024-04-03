const Box1 = ({ studentList, selectedItems, onHandleSelect }) => {
    return (
        <div className='card-content'>
            {studentList.map(({ name, marks, id }) => (
                <div key={id} >
                    <input type='checkbox' id={'_' + id} checked={selectedItems?.includes(id)} onChange={() => onHandleSelect(id)} className='mx-2' />
                    <label htmlFor={'_' + id}>ID: {id}, Name: {name}, Marks: {marks}</label>
                </div>
            ))
            }
        </div >
    )
}

export default Box1;