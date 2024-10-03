import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap'



const BoardWrite = () => {

    const nav = useNavigate();

    const [form, setForm] = useState({
        title: '',
        contents: '',
        writer: '',
    });

    const { title, contents, writer } = form;

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async () => {
        if (title === '') {
            alert('제목을 입력하세요');
        } else if (contents === '') {
            alert('제목을 입력하세요');
        } else {
            if (window.confirm('게시글을 등록하시겠습니까?')) {
                await axios.post('http://localhost:5000/insert', form);
                // 페이지 전환 
                // replace: true 옵션을 사용하면 새로운 경로로 이동할 때 이전 경로가 히스토리에 남지 않아서 뒤로 가기 버튼을 눌러도 이전 페이지로 돌아갈 수 없습니다.
                nav('/', { replace: true });
            }
        }
    }


    const onReset = () => {
        setForm({
            title: '',
            contents: '',
            writer: '',
        })
        nav('/');
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className='text-center my-5'>게시글 작성</h1>
                <Form>
                    <h4>제목</h4><Form.Control placeholder='제목을 입력하세요.'
                        className='my-3' name='title' value={title} onChange={onChangeForm} />

                    <h4>작성자</h4><Form.Control placeholder='작성자를 입력하세요.'
                        className='my-3' name='writer' value={writer} onChange={onChangeForm} />

                    <h4>내용</h4><Form.Control as='textarea' rows={10} placeholder='내용을 입력하세요.'
                        className='my-3' name='contents' value={contents} onChange={onChangeForm} />

                    <div className='text-center'>
                        <Button className='mx-2 px-3 btn-sm' onClick={onSubmit}>저장</Button>
                        <Button className='mx-2 px-3 btn-sm' onClick={onReset} variant='secondary'>초기화</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default BoardWrite;