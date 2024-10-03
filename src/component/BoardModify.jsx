import { Form, Col, Row, Button } from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const BoardModify = () => {
    /*
        const params = useParams();
        const id = params.id;        
    */
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const nav = useNavigate();
    /*
        PromiseResult : Object
         - data : Array(1)
    */
    const getBoard = async () => {
        const board = await axios.get(`http://localhost:5000/view/${id}`);
        setBoard(board.data[0]);
    }

    useEffect(() => {
        getBoard();
    }, [])


    const [form, setForm] = useState({
        title: '',
        contents: '',
        writer: '',
    });


    const { title, writer, contents } = form;

    const onChanageForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async () => {
        if (title == '') {
            alert('제목을 입력하세요');
        } else if (contents === '') {
            alert('내용을 입력하세요');
        } else if (writer === '') {
            alert('작성자를 입력하세요')
        } else {
            if (window.confirm('게시글을 수정하시겠습니까?')) {
                await axios.post(`http://localhost:5000/update/${id}`, form);
                // 페이지 전환 
                // replace: true 옵션을 사용하면 새로운 경로로 이동할 때 이전 경로가 히스토리에 남지 않아서 뒤로 가기 버튼을 눌러도 이전 페이지로 돌아갈 수 없습니다.
                nav('/list', { replace: true });
            }
        }
    }

    const onReset = () => {
        setForm({
            title: board.title,
            contents: board.contents,
            writer: board.writer,
        });
    }



    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center my-5'>게시글 수정</h1>
                <Form>
                    <h4>제목</h4>
                    <Form.Control placeholder={board.title} className='my-3' name='title' onChange={onChanageForm} value={title} />
                    <h4>작성자</h4>
                    <Form.Control placeholder={board.writer} className='my-3' name='writer' onChange={onChanageForm} value={writer} />
                    <h4>내용</h4>
                    <Form.Control as='textarea' rows={10} placeholder={board.contents} className='my-3' name='contents' onChange={onChanageForm} value={contents} />
                    <div className='text-center'>
                        <Button className='mx-2 px-3 btn-sm' onClick={onSubmit}>저장</Button>
                        <Button className='mx-2 px-3 btn-sm' variant='secondary' onClick={onReset}>초기화</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}


export default BoardModify;