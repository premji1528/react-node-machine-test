const Box2 = ({ studentList }) => {

    return (
        <div className='card-content'>
            {studentList.map(({ name, marks, id }) => (
                <div key={id}>ID: {id}, Name: {name}, Marks: {marks}</div>
            ))}
        </div>
    )
}

export default Box2;