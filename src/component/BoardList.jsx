import { Table, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import TableRow from './TableRow'

const BoardList = () => {

    const noRef = useRef(1);

    const [boardList, setBoardList] = useState([]);

    const getBoardData = async () => {
        const boardList = await axios('http://localhost:5000/list');
        // console.log(boardList);
        setBoardList(boardList.data);
    }


    // 화면이 렌더링 될때 
    useEffect(() => {
        getBoardData();
    }, []);


    return (
        <div className='board-list'>
            <h1>게시글 목록</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardList.map((board) => {
                            board['no'] = noRef.current++;
                            return <TableRow key={board.id} {...board} />
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}


export default BoardList;