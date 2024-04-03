import { createContext, useState } from "react";

export const SudentContext = createContext(null);

const StudentContextWrapper = ({ children }) => {
    const [studentList1, setStudentList1] = useState([])
    const [studentList2, setStudentList2] = useState([])

    const handleExchange = (items) => {
        const students1 = [...studentList1];
        const selectedItems = [], unSelectedItems = [];

        students1.forEach((student) => {
            if (items.includes(student.id)) {
                selectedItems.push(student)
            } else {
                unSelectedItems.push(student)
            }
        });


        const box2FinalList = () => {
            const results = [];
            [...selectedItems, ...studentList2].forEach((item) => {
                if (!results.some((result) => result.id === item.id)) {
                    results.push(item);
                }
            })

            return results;
        }

        setStudentList1(unSelectedItems)
        setStudentList2(box2FinalList())
    }

    return (
        <SudentContext.Provider value={{
            studentList1: studentList1.sort((a, b) => a.id > b.id ? 1 : -1),
            setStudentList1,
            studentList2: studentList2.sort((a, b) => a.id > b.id ? 1 : -1),
            setStudentList2,
            handleExchange
        }}>
            {children}
        </SudentContext.Provider >
    )
}

export default StudentContextWrapper;