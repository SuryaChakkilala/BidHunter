import React, {useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ navigate }) =>{
    const [keyword,setKeyword] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)  // URL TO BE REDIRECTED TO
        } else {
            navigate('/')
        }
    }

    return (
        <>
        <Form className="d-flex px-5" onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='mx-3'>
                Search
            </Button>
        </Form>
      </>
    )

}
export default  SearchBox 