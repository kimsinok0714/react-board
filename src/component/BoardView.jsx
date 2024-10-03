import { Row, Col, Card, Button } from 'react-bootstrap'
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BoardView = () => {
    /*
    const params = useParams();
    const id = params.id;
    console.log(params);
    console.log(params.id);
    */

    const nav = useNavigate();

    const { id } = useParams();

    const [board, setBoard] = useState({});

    const getBoard = async () => {
        const board = await axios.get(`http://localhost:5000/view/${id}`);
        console.log(board);
        console.log(board.data[0]);
        setBoard(board.data[0]);
    }

    // BoardView 컴포넌트가 마운트될 때
    useEffect(() => {
        getBoard();
    }, []);


    const onDelete = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            const data = await axios.get(`http://localhost:5000/delete/${id}`);
            if (data.status == 200) {
                nav('/list', { replace: true });
            }
        }
    }


    return (
        <div className="board-view">
            <Row className='my-5'>
                <Col className='px-5'>
                    <h1 className='my-5 text-center'>{board.id}번 게시글 정보</h1>
                    <div className='text-end my-2'>
                        <Link to={`/modify/${id}`}>
                            <Button className='btn-sm mx-2'>수정</Button>
                        </Link>
                        <Button className='btn-sm' variant='danger' onClick={onDelete}>삭제</Button>
                    </div>
                    <Card>
                        <Card.Body>
                            <h5>[{board.id}] {board.title}</h5>
                            <hr />
                            <div className='cArea'>{board.contents}</div>
                        </Card.Body>
                        <Card.Footer>
                            Created on {board.reg_date} by {board.writer}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}


export default BoardView;